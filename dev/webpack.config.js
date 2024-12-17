const path = require('path');

module.exports = {
	cache: false,
	entry: {
		app: './src/app.js',
	},
	output: {
		clean: true,
		filename: '[name].js',
		path: path.resolve(__dirname, './assets/js'),
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
		]
	},
	devServer: {
		static: path.resolve(__dirname, './'),
		port: 5513,
		hot: true,
		open: true,
		allowedHosts: ['auto', '.local', '.test'],
		client: {
			overlay: {
				errors: false,
				warnings: false,
				runtimeErrors: false,
			},
		},
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	},
};
