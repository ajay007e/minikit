# MiniKit Build System

.PHONY: dist css clean size publish watch pack

NAME = minikit
SRC = src/css/index.css
DIST = dist

dist: css size

css:
	@mkdir -p $(DIST)

	@npx esbuild $(SRC) \
		--bundle \
		--outfile=$(DIST)/$(NAME).css

	@npx esbuild $(SRC) \
		--bundle \
		--minify \
		--outfile=$(DIST)/$(NAME).min.css

	@gzip -9 -k -f $(DIST)/$(NAME).min.css

	@echo "CSS: $$(wc -c < $(DIST)/$(NAME).min.css | tr -d ' ') bytes (minified)"

watch:
	@mkdir -p $(DIST)

	@npx esbuild $(SRC) \
		--bundle \
		--watch \
		--outfile=$(DIST)/$(NAME).css

clean:
	@rm -rf $(DIST)

size:
	@echo ""
	@echo "Bundle:"
	@echo "CSS (src):   $$(wc -c < $(DIST)/$(NAME).css | tr -d ' ') bytes"
	@echo "CSS (min):   $$(wc -c < $(DIST)/$(NAME).min.css | tr -d ' ') bytes"
	@echo "CSS (gzip):  $$(wc -c < $(DIST)/$(NAME).min.css.gz | tr -d ' ') bytes"

pack: clean dist
	@npm pack --dry-run

publish: clean dist
	@npm publish --access public
