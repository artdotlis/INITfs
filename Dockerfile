FROM docker.io/rockylinux:9 AS base

ARG USERNAME=runner
ARG USER_UID=1000
ARG USER_GID=${USER_UID}
ARG HOME_MAIN="/home/${USERNAME}"

RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m -d ${HOME_MAIN} ${USERNAME} \
    && chown ${USERNAME}:${USERNAME} -R ${HOME_MAIN}

FROM base AS appbuilder

ARG BIN_DEPLOY
ARG STAGE

COPY . /tmp/app

WORKDIR /tmp/app

RUN bash "./${BIN_DEPLOY}"

FROM base AS release

ARG DOCKER_ENV_DIR
ARG NODE_VER
ARG BUN_VER
ARG BIN_DEPLOY_REQ_SERVER
ARG USERNAME=runner

COPY ./${BIN_DEPLOY_REQ_SERVER} /install.sh

RUN bash /install.sh && rm /install.sh

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