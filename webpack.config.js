const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");

const plugins = [
  new CleanWebpackPlugin(),
  new OptimizeCSSAssetsPlugin({}),
  new HtmlWebpackPlugin({
    filename: "./index.html",
    template: "./index.html",
    inject: "body",
  }),
];

module.exports = (env, argv) => {
  console.log("devMode: ", argv.mode);
  const devMode = argv.mode !== "production";
  if (!devMode) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      })
    );
    // plugins.push(new HTMLInlineCSSWebpackPlugin());
    // plugins.push(new HtmlInlineScriptPlugin());
  }
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[contenthash].bundle.js",
      // publicPath: './'
      // assetModuleFilename: "img/[hash][ext][query]",
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          include: [path.resolve(__dirname, "src")],
          // use: [MiniCssExtractPlugin.loader, "css-loader"]
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        // {
        //   test: /\.(png|jpg|gif)$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         // limit: 10240,
        //         name: 'img/[name]_[hash:4].[ext]'
        //       }
        //     }
        //   ]
        // },
        {
          test: /\.(png|jpg|gif)$/,
          type: "asset",
          generator: {
            filename: "imgs/[hash][ext][query]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 100 * 1024,
            },
          },
        },
        {
          test: /\.jsx?/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "src")],
      extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
    externals: {
      jquery: "$",
    },
  };
};
