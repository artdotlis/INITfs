ARG NODE_VER="22"

FROM docker.io/rockylinux:9 AS appbuilder

ARG BIN_DEPLOY
ARG STAGE

COPY . /tmp/app

WORKDIR /tmp/app

RUN bash "./${BIN_DEPLOY}"

FROM docker.io/node:${NODE_VER}-alpine AS release

ARG USERNAME=runner
ARG USER_UID=1000
ARG USER_GID=${USER_UID}
ARG HOME_MAIN="/home/${USERNAME}"

RUN adduser -u ${USER_UID} -D -h ${HOME_MAIN} ${USERNAME} \
    && mkdir -p ${HOME_MAIN} \
    && chown ${USERNAME}:${USERNAME} -R ${HOME_MAIN}

ARG DOCKER_ENV_DIR
ARG BUN_VER
ARG BIN_DEPLOY_REQ_SERVER

COPY ./${BIN_DEPLOY_REQ_SERVER} /install.sh

RUN sh /install.sh && rm /install.sh

COPY --from=appbuilder /entry.sh  /entry.sh
COPY --from=appbuilder /health.sh  /health.sh
COPY --from=appbuilder $DOCKER_ENV_DIR/* $DOCKER_ENV_DIR/

WORKDIR /var/www/

RUN rm -rf /var/www/*

COPY --from=appbuilder /var/www/ ./

RUN chown ${USERNAME}:${USERNAME} -R /var/www/

HEALTHCHECK --interval=30s --timeout=3s --retries=2 CMD /bin/sh /health.sh

USER ${USERNAME}

WORKDIR ${HOME_MAIN}

ENTRYPOINT ["/bin/sh", "/entry.sh"]