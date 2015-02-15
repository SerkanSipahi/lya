
BUILD  ?= build
SYSTEM ?= traceur
MODULE ?= system

default:
	@echo ""
	@echo "Available Targets:"
	@echo ""
	@echo "   make build system=<name> module=<name>"
	@echo "      @systems:"
	@echo "       - traceur"
	@echo "       - babel"
	@echo "       - browser"
	@echo "       - native"
	@echo "      @default:"
	@echo "       - system=traceur"
	@echo ""
	@echo "      @modules:"
	@echo "       - amd"
	@echo "       - common"
	@echo "       - ignore"
	@echo "       - system"
	@echo "       - umd"
	@echo "      @default:"
	@echo "       - module=ignore"
	@echo ""
	@echo "   make clean"
	@echo "   make clean-node_modules"
	@echo "   make npm-install"
	@echo ""

build: npm-install create-dirs

clean: clean-node_modules clean-dirs

clean-dirs:
	rm -rf $(BUILD)

clean-node_modules:
	rm -rf node_modules

create-build:
	[ -d $(BUILD) ] ||  mkdir $(DIST)

npm-install:
	npm install

.PHONY: build clean clean-build clean-node_modules create-build default npm-install
MAKEFLAGS = -s