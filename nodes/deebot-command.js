module.exports = function (RED) {
    const {commands} = require('../resources/commands');

    function EcovacsDeebotCommandNode(config) {
        RED.nodes.createNode(this, config);
        this.command = config.command;
        this.arg = config.arg;
        this.arg2 = config.arg2;
        this.arg3 = config.arg3;

        let node = this;
        node.config = config;
        node.on('input', (msg) => {
            sendCommand(node, msg);
        });

        function sendCommand(node, msg) {
            const command = commands[node.config.command];
            const output = {};

            if (command) {
                Object.assign(output, {payload: command.payload});
            } else if (msg && msg.payload) {
                Object.assign(output, {payload: msg.payload});
            }

            if (command && command.arg && (typeof command.arg !== 'object')) {
                Object.assign(output, {arg: command.arg});
            } else if (msg && msg.arg) {
                Object.assign(output, {arg: msg.arg});
            }

            if (command && command.arg2 && (typeof command.arg2 !== 'object')) {
                Object.assign(output, {arg2: command.arg2});
            } else if (msg && msg.arg2) {
                Object.assign(output, {arg2: msg.arg2});
            }

            if (command && command.arg3 && (typeof command.arg3 !== 'object')) {
                Object.assign(output, {arg3: command.arg3});
            } else if (msg && msg.arg3) {
                Object.assign(output, {arg3: msg.arg3});
            }

            if (output) {
                node.send(output);
            }
        }
    }

    RED.nodes.registerType("ecovacs-deebot-command", EcovacsDeebotCommandNode);
}
