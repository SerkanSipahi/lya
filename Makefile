
export PATH := $(PATH):$(PWD)/node_modules/.bin

build-dir ?= build
system    ?= traceur
module    ?= system

es6-module-loader = $(shell echo ./node_modules/es6-module-loader/dist/es6-module-loader.{js,js.map})
systemjs          = $(shell echo ./node_modules/systemjs/dist/system.{js,js.map})
traceur-runtime   = ./node_modules/traceur/bin/traceur-runtime.js

default:
	@echo ""
	@echo "Available Targets:"
	@echo ""
	@echo "   make build system=<name>"
	@echo "      @systems:"
	@echo "       - traceur"
	@echo "       - babel"
	@echo "       - requirejs"
	@echo "       - browser"
	@echo "      @default:"
	@echo "       - system=traceur"
	@echo ""

build: npm-install create-build-dir build-env

build-env: $(system)
	@make build-$^

build-traceur:
	@cp $(es6-module-loader) $(systemjs) $(traceur-runtime) ./build/ && \
	node builder.js true true true

build-babel:
	@echo 'x babel-build x'

build-browser:
	@echo 'x browser x'

watch: $(system)
	@watch 'make build-$^' ./ --wait 1

clean: clean-node_modules clean-build-dir

clean-build-dir:
	@rm -rf $(build-dir)

clean-node_modules:
	@rm -rf node_modules

create-build-dir:
	@test -d $(build-dir) || mkdir $(build-dir)

npm-install:
	@npm install

.PHONY: build build-env buid-lyadom build-module clean clean-build-dir clean-node_modules create-build-dir default npm-install $(system) $(module)
MAKEFLAGS = -s
