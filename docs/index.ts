import yaml = require('js-yaml');
import fs = require('fs');
import util = require('util');
import path = require('path');

const DEBUG = false;
const OPENAPI_VER = '3.0.3';
const FILES_ENCODING = 'utf8';

interface FinalDefinition {
  openapi: string;
  info: Record<string, unknown>;
  servers?: Array<string>;
  tags?: Array<Record<string, unknown>>;
  paths?: Record<string, unknown>;
  components?: Record<string, unknown>;
}

interface Meta {
  info?: Record<string, unknown>;
  servers?: Record<string, unknown>;
  tags?: Record<string, unknown>;
}

function compileFinal(): FinalDefinition {
  const meta = loadSpecs<Meta>('meta'); 
  const servers = Object.entries(meta.servers).map(([, v]) => v);
  const tags = Object.entries(meta.tags).map(([, v]) => v);

  const pathsRaw = loadSpecs<Record<string, unknown>>('routes');
  const schemas = loadSpecs<Record<string, unknown>>('components/schemas');
  const responses = loadSpecs<Record<string, unknown>>('components/responses');
  const parameters = loadSpecs<Record<string, unknown>>(
    'components/parameters',
  );

  let paths = {}; 
  for (const key in pathsRaw) {
    if (pathsRaw.hasOwnProperty(key)) {
      paths = { ...paths, ...pathsRaw[key] };
    }
  }

  return {
    openapi: OPENAPI_VER,
    info: { ...meta.info },
    servers: servers,
    tags: tags,
    paths: paths,
    components: {
      schemas,
      responses,
      parameters,
    },
  };
}

function loadSpecs<T>(folder: string) {
  const targetPath = path.join(__dirname, folder);
  const filenames: Array<string> = fs.readdirSync(targetPath);

  let container: Record<string, T> = {};
  filenames.forEach((fn) => {
    try {
      const filename = path.join(__dirname, folder, fn);
      const content = fs.readFileSync(filename, FILES_ENCODING);
      const doc =
        (yaml.load(content, { schema: yaml.JSON_SCHEMA, json: true }) as Record<
          string,
          T
        >) || {};
      container = { ...container, ...doc };

      if (DEBUG) {
        console.log(fn, ': ', util.inspect(doc, false, 5, true));
      }
    } catch (e) {
      console.log(e);
    }
  });
  return container;
}

// main
const finalDefinition: FinalDefinition = compileFinal();
const apis: Array<string> = [];
const options = {
  explorer: true,
};

if (DEBUG) {
  console.log(util.inspect(finalDefinition, false, 5, true));
}

export default { definition: finalDefinition, apis: apis, options };
