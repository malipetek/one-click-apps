import path from 'path';
import yaml from 'yaml';
import { strOptions } from 'yaml/types';
import fs from 'fs-extra';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/*jshint esversion: 6 */
strOptions.fold.lineWidth = 0;

// Next, for V4:
// ============================================================================
// ============================================================================
// *********** THIS IS ONLY TO BE DONE AFTER CAPROVER 1.8 RELEASE *************
// ============================================================================
// ============================================================================
// 
// 1- DUPLICATE this script. The new script is to ONLY read from /public/v4/*.yaml
// 2- Test with a new YAML file
// 3- Write script to convert all v2 JSON to V4 yaml and place them in /public/v4/*.yaml
// 4- Update readme!!!!
// 5- Push all 3 steps above at the same time to GITHUB

const pathOfPublic = path.join(__dirname, '..', `public`);

const pathOfDist = path.join(__dirname, '..', `dist`);

const pathOfDistV2 = path.join(pathOfDist, 'v2');
const pathOfDistV3 = path.join(pathOfDist, 'v3');
const pathOfDistV4 = path.join(pathOfDist, 'v4');

const pathOfSourceDirectoryV2 = path.join(pathOfPublic, 'v2');
const pathOfSourceDirectoryAppsV2 = path.join(pathOfSourceDirectoryV2, 'apps');
const pathOfSourceDirectoryLogosV2 = path.join(pathOfSourceDirectoryV2, 'logos');

function convertV2toV4(v2String) {
    const parsed = JSON.parse(v2String);
    if (`${parsed.captainVersion}` !== '2') {
        throw new Error('CaptainVersion must be 2 for this conversion');
    }

    function moveProperty(propertyName) {
        parsed.caproverOneClickApp[propertyName] = parsed[propertyName];
        parsed[propertyName] = undefined;
    }

    parsed.services = parsed.dockerCompose.services;
    parsed.dockerCompose = undefined;

    parsed.captainVersion = 4;
    parsed.caproverOneClickApp = {};

    moveProperty('variables');
    moveProperty('instructions');
    moveProperty('displayName');
    moveProperty('isOfficial');
    moveProperty('description');
    moveProperty('documentation');

    Object.keys(parsed.services).forEach(serviceName => {
        const service = parsed.services[serviceName];
        if (service.containerHttpPort) {
            service.caproverExtra = service.caproverExtra || {};
            service.caproverExtra.containerHttpPort = service.containerHttpPort;
        }
        if (service.dockerfileLines) {
            service.caproverExtra = service.caproverExtra || {};
            service.caproverExtra.dockerfileLines = service.dockerfileLines;
        }
        if (service.notExposeAsWebApp) {
            service.caproverExtra = service.caproverExtra || {};
            service.caproverExtra.notExposeAsWebApp = service.notExposeAsWebApp;
        }
        service.containerHttpPort = undefined;
        service.dockerfileLines = undefined;
        service.notExposeAsWebApp = undefined;
    });

    return JSON.parse(JSON.stringify(parsed));
}

async function buildDist() {
    const appsFileNames = await fs.readdir(pathOfSourceDirectoryAppsV2);

    appsFileNames.forEach(async appFileName => {
        const pathOfAppFileInSource = path.join(pathOfSourceDirectoryAppsV2, appFileName);

        //v4
        const pathOfSourceDirectoryV4 = path.join(pathOfPublic, 'v4');
        const contentString = await fs.readFile(pathOfAppFileInSource);

        await fs.outputFile(path.join(pathOfSourceDirectoryV4, `apps`, appFileName.split('.')[0] + '.yml'), yaml.stringify(convertV2toV4(contentString)));
        await fs.move(path.join(pathOfSourceDirectoryV2, `logos`, appFileName.split('.')[0] + '.png'), path.join(pathOfSourceDirectoryV4, `logos`, appFileName.split('.')[0] + '.png'));
        await fs.remove(path.join(pathOfSourceDirectoryV2, `apps`, appFileName.split('.')[0] + '.json'));
    });
}

(async () => {
    try {
        await buildDist();
    } catch (err) {
        console.error(err);
        process.exit(127);
    }
})();
