import { Button } from "@nextui-org/button";
import { LucideCopy } from "lucide-react";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

const CopyTextComponent = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);
  //   const textToCopy = "Hello, copy me!";

  const handleCopy = () => {
    setCopied(true);
    toast.success("Text copied to clipboard");
  };

  return (
    <div>
      {/* <h2>Copy Text to Clipboard</h2> */}
      {/* <p>{textToCopy}</p> */}

      <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
        <Button isIconOnly variant="flat" radius="full">
          <LucideCopy size={16} />
        </Button>
      </CopyToClipboard>

      {/* {copied && <p style={{ color: "green" }}>Text copied to clipboard!</p>} */}
    </div>
  );
};

export default CopyTextComponent;
