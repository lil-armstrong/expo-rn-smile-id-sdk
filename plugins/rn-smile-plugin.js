// rn-smile-plugin.js

function withSmileExpoPlugin (config, prefix) {
	// Modify config
	config.name = prefix + '-' + config.name;
	return config;
}	
