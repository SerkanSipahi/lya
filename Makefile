
export PATH      := $(PATH):$(PWD)/node_modules/.bin

karma             = ./node_modules/karma/bin/karma
karmaConfig       = ./test/karma.conf.js
rtts_assert       = ./node_modules/rtts_assert

default:
	@echo ""
	@echo "Available Targets:"
	@echo ""
	@echo "   make test"
	@echo ""

test: clean npm-install prepare_rtts_assert
	$(karma) start $(karmaConfig)

clean: clean-node_modules

clean-node_modules:
	@rm -rf ./node_modules

npm-install:
	@npm install

prepare_rtts_assert:
	mv $(rtts_assert)/es6/rtts_assert.es6 $(rtts_assert)/es6/rtts_assert.js; \
	mv $(rtts_assert)/es6/src/rtts_assert.es6 $(rtts_assert)/es6/src/rtts_assert.js

PHONY  =  
PHONY += clean clean-node_modules default 
PHONY += prepare_rtts_assert test npm-install 
.PHONY : $(PHONY)

MAKEFLAGS = -s
