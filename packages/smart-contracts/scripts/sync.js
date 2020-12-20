const fs = require("fs");
const chalk = require("chalk");
const bre = require("hardhat");

const DEPLOY_DIR = "./deployments"
const PUBLISH_DIR = "../frontend/src/contracts"
const GRAPH_DIR = "../subgraph"

function syncContract(network, chainId, contractName) {
  console.log(
    "Syncing",
    chalk.cyan(contractName),
    "to",
    chalk.yellow(PUBLISH_DIR)
  );
  try {
    let deployJson = JSON.parse(fs
      .readFileSync(`${DEPLOY_DIR}/${network}/${contractName}.json`))
    
    const address = deployJson.address;
    const contract = deployJson.abi;
    let graphConfigPath = `${GRAPH_DIR}/config/${network}.json`
    let graphConfig
    try {
      if (fs.existsSync(graphConfigPath)) {
        graphConfig = fs
          .readFileSync(graphConfigPath)
          .toString();
      } else {
        graphConfig = '{}'
      }
    } catch (e) {
      console.log(e)
    }

    graphConfig = JSON.parse(graphConfig)
    graphConfig["network"] = network
    graphConfig[contractName + "Address"] = address
    
    let addressesJson = {}
    if(fs.existsSync(`${PUBLISH_DIR}/${contractName}.address.json`)) {
      let addressesFile = fs.readFileSync(`${PUBLISH_DIR}/${contractName}.address.json`)
      addressesJson = JSON.parse(addressesFile)
    }
    
    addressesJson[`${chainId}`] = address

    fs.writeFileSync(
      `${PUBLISH_DIR}/${contractName}.address.json`,
      JSON.stringify(addressesJson, null, 2)
    );
    fs.writeFileSync(
      `${PUBLISH_DIR}/${contractName}.json`,
      JSON.stringify(contract, null, 2)
    );

    console.log(
      "Syncing",
      chalk.cyan(contractName),
      "to",
      chalk.yellow(GRAPH_DIR + "/abis")
    );

    const folderPath = GRAPH_DIR + "/config"
    if (!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(
      graphConfigPath,
      JSON.stringify(graphConfig, null, 2)
    );
    fs.writeFileSync(
      `${GRAPH_DIR}/abis/${contractName}.json`,
      JSON.stringify(contract, null, 2)
    );

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function main() {
  if (!fs.existsSync(PUBLISH_DIR)) {
    fs.mkdirSync(PUBLISH_DIR);
  }
  
  if (fs.existsSync(DEPLOY_DIR)) {
    fs.readdirSync(DEPLOY_DIR).forEach((network) => {
      let chainId = "4"
      let contracts = []
      fs.readdirSync(`${DEPLOY_DIR}/${network}`).forEach((file) => {
        if(file == ".chainId") {
          chainId = fs.readFileSync(`${DEPLOY_DIR}/${network}/${file}`)
        } else if (file != "solcInputs") {
          contracts.push(file.replace(".json", ""))
        }
      })
      for (const contract of contracts) {
        syncContract(network, chainId, contract)
      }
    });
  } else {
    console.log("No deployments yet. Deploy contracts before running sync.")
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
