
install-js-deps:
	bower install
	git submodule init
	git submodule update

watch:
	compass watch

build:
	compass compile
	node js/jsx-requirejs-plugin/r.js -o build.js

rsync-deploy:
	rsync -av ~/code/balneario/ felipe@balneariocajueiro.com.br:/home/felipe/balneario

deploy: build rsync-deploy

.PHONY: install-js-deps watch build rsync-deploy deploy
