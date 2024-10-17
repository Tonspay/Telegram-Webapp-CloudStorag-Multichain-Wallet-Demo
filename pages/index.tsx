import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from 'react'

import CloudStorageWallet from "@tonsprotocol/telegram-cloudstorage-wallet"

export default function IndexPage() {
  const [keypair, setKeypair] = useState({
    raw:"",
    evmAddress:"",
    solanaAddress:"",
    tonAddress:"",
  })

  useEffect(() => {
    const onload =async ()=>{
      // const kp = await 

      console.log("page init")
      console.log("🍺CloudStorageWallet",CloudStorageWallet);
      console.log("🍺CloudStorageWallet.init",CloudStorageWallet.init);
      const kp = await CloudStorageWallet.init("hellopath")
      if(kp && kp?.keypair && kp?.rawKp && kp.keypair?.evmKp && kp.keypair.evmKp?.address && kp.keypair?.solKp && kp.keypair.solKp?.address && kp.keypair?.tonKp && kp.keypair.tonKp?.address )
      {
        console.log(
          kp.keypair
        )
  
        setKeypair(
          {
            raw : kp.rawKp,
            evmAddress:kp.keypair.evmKp.address.toString(),
            solanaAddress:kp.keypair.solKp.address.toString(),
            tonAddress:kp.keypair.tonKp.address.toString(),
          }
        )
      }

    }
    onload().catch(console.error);;
  }, [])

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Telegram&nbsp;</span>
          <span className={title({ color: "violet" })}>Cloudstorage&nbsp;</span>
          <br />
          <span className={title()}>
          wallet Demo
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Build the telegram cloudstorage base wallet in one step
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Get start !
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              {" "}
              <Code color="primary">npm i @tonsprotocol/telegram-cloudstorage-wallet</Code>
            </span>
          </Snippet>
        </div>
        <div style={{textAlign:"center"}}>
        EVM Address
        <br></br>
        {/* {keypair.evmAddress} */}
        <Code color="primary">:{keypair.evmAddress}</Code>
        </div>
        <br></br>
        <div style={{textAlign:"center"}}>
        Solana Address 
        {/* {keypair.solanaAddress} */}
        <br></br>
        <Code color="primary">:{keypair.solanaAddress}</Code>
        </div>
        <br></br>
        <div style={{textAlign:"center"}}>
        TON Address
        <br></br>
        {/* {keypair.tonAddress} */}
        <Code color="primary">: {keypair.tonAddress}</Code>
        </div>

      </section>
    </DefaultLayout>
  );
}
