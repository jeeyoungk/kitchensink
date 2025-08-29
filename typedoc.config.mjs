/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: ["src/index.ts"],
  out: "docs",
  name: "kitchensink",
  theme: "default",
  hideGenerator: true,
  includeVersion: true,
  searchInComments: true,
  sort: ["kind", "instance-first", "alphabetical-ignoring-documents"],
  kindSortOrder: [
    // https://typedoc.org/documents/Options.Organization.html#kindsortorder for the default order.
    "Reference",
    "Project",
    "Module",
    "Namespace",
    "Enum",
    "EnumMember",
    "Class",
    "Function", // moving it up, over types.
    "Interface",
    "TypeAlias",
    "Constructor",
    "Property",
    "Variable",
    "Accessor",
    "Method",
    "Parameter",
    "TypeParameter",
    "TypeLiteral",
    "CallSignature",
    "ConstructorSignature",
    "IndexSignature",
    "GetSignature",
    "SetSignature",
  ],
  readme: "README.md",
  projectDocuments: ["CHANGELOG.md"],
  alwaysCreateEntryPointModule: false,
  exclude: ["**/*.test.ts", "node_modules/*", "docs/*", "dist/*"],
  excludeExternals: true,
  excludePrivate: true,
  excludeProtected: true,
  validation: {
    notExported: true,
    invalidLink: true,
    notDocumented: false,
  },
  navigation: {
    includeCategories: true,
    includeGroups: false,
  },
  navigationLinks: {
    Github: "https://github.com/jeeyoungk/kitchensink",
  },
  categorizeByGroup: false,
  externalSymbolLinkMappings: {
    // https://typedoc.org/documents/Options.Comments.html#externalsymbollinkmappings
    "bun-types": {
      AbortSignal: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal",
      AbortController: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
    },
    typescript: {
      Iterator: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator",
      Iterable: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator",
      AsyncIterator: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator",
      AsyncIterable: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator",
      // Promise doc is a bit noisy.
      // Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
      Disposable: "https://github.com/tc39/proposal-explicit-resource-management",
    },
    global: {
      // Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
    },
  },
  tsconfig: "tsconfig.json",
};
export default config;
