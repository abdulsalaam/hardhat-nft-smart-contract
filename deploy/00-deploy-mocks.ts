import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers, network } from 'hardhat'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const chainId = network.config.chainId

  if (chainId == 31337) {
    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    const nftName = 'MyNftCollection'
    const nftSymbol = 'MNC'
    const hiddenMetadataUri = 'ipfs://__CID__/hidden.json'
    const maxSupply = 100
    const mintPrice = ethers.utils.parseEther('0.02')
    const maxMintAmountPerTx = 5

    const args = [
      nftName,
      nftSymbol,
      hiddenMetadataUri,
      maxSupply,
      mintPrice,
      maxMintAmountPerTx,
    ]

    await deploy('MyNftCollectionMock', {
      from: deployer,
      args: args,
      log: true,
    })
  }
}
export default func
func.tags = ['mocks']
