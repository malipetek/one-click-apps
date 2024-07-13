import fs from 'fs';

const apps = {};
const app_files = fs.readdirSync('./public/v4/apps');
// read file contents
app_files.forEach(app => {
  apps[app] = { content: (fs.readFileSync(`./public/v4/apps/${app}`, 'utf8')) };
  // copy images to static folder
  fs.copyFileSync(`./public/v4/logos/${app.replace('.yml', '.png')}`, `./static/${app.replace('.yml', '.png')}`);
  apps[app].logo = `${app.replace('.yml', '.png')}`;
});

fs.writeFileSync('./src/lib/one-click-apps.js', `
    export default ${JSON.stringify(apps, null, 2)};
`, 'utf8');