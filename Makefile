ROOT_MAKEFILE:=$(abspath $(patsubst %/, %, $(dir $(abspath $(lastword $(MAKEFILE_LIST))))))

include $(ROOT_MAKEFILE)/.env
include $(WEB_ENV)

export

BUN_DIR=$(HOME)/.bun
BUN_BIN=$(BUN_DIR)/bin
BUN=$(BUN_BIN)/bun

export PATH:=$(PATH):$(BUN_BIN)

dev: NODE_ENV = development
dev: setupGit setupBun postInstall
	$(BUN) install --frozen-lockfile
	$(BUN) run hook

build: NODE_ENV = production
build: setupBun postInstall 
	$(BUN) install --frozen-lockfile

setupGit:
	git config core.editor vim
	git lfs install --force

setupBun:	
	mkdir -p "${HOME}/.local/bin"
	bash $(ROOT_MAKEFILE)/$(BIN_INSTALL_BUN)	

postInstall:
	bash $(ROOT_MAKEFILE)/$(BIN_DEPLOY_FIX)

cleanBuild:
	rm -rf $(ROOT_MAKEFILE)/$(PROFILE_DIR)
	rm -rf $(ROOT_MAKEFILE)/$(APP)

clean: cleanBuild
	rm -rf $(ROOT_MAKEFILE)/node_modules
	rm -rf $(ROOT_MAKEFILE)/$(CACHE_DIR)

uninstall: clean
	[ -f "$(BUN)" ] && $(BUN) pm cache rm || echo "not installed"
	rm -rf $(BUN_DIR)

runAct: 
	echo "starting environment"
	bash

runChecks: dev
	$(BUN) run lint
	$(BUN) run lint:dev
	$(BUN) run lint:web
	$(BUN) run lint:shell
	$(BUN) run lint:format

createBuild: NODE_ENV = production
createBuild: cleanBuild
	[ 'true' = "$(STAGE)" ] && echo "STAGE -> $(STAGE)" || echo "NOT STAGE"
	[ -d $(ROOT_MAKEFILE)/$(EXTRA_ASSETS_DIR) ] && [ -d $(ROOT_MAKEFILE)/$(EXTRA_PUBLIC_DIR) ] \
		&& $(BUN) run build || $(shell echo "FAILED" && exit 1)

runBuild: build createBuild	

runStage: STAGE = true
runStage: NODE_ENV = production
runStage: build createBuild		
	[ -d $(ROOT_MAKEFILE)/$(EXTRA_ASSETS_DIR) ]  && [ -d $(ROOT_MAKEFILE)/$(EXTRA_PUBLIC_DIR) ] \
		&& $(BUN) run serve || $(shell echo "FAILED" && exit 1)


runDev: NODE_ENV = development
runDev: dev
	[ -d $(ROOT_MAKEFILE)/$(EXTRA_ASSETS_DIR) ]  && [ -d $(ROOT_MAKEFILE)/$(EXTRA_PUBLIC_DIR) ] \
		&& $(BUN) run dev || $(shell echo "FAILED" && exit 1)

runProfile: NODE_ENV = production
runProfile: build
	$(BUN) run profile

runPreCommit: NODE_ENV = development
runPreCommit: createBuild dev
	$(BUN) run lint

runUpdate: %: export_% dev

export_runUpdate: NODE_ENV = development
export_runUpdate: clean
	echo "UPDATE NODE -> $(NODE_ENV)"
	rm -f $(ROOT_MAKEFILE)/*.lock
	$(BUN) update
