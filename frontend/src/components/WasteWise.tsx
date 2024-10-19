import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
// import Button from "./Button";
import { ToastElem, capitalize, roleMap, shortenAddress } from "../utils";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { BaseError } from "viem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../assets";
import React from "react";
import { useWasteWiseContext } from "../context";
import { Button } from "@nextui-org/button";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { LucideBuilding2, LucidePower, LucideUserPlus2 } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import {
  Wallet,
  ConnectWalletText,
  ConnectWallet,
} from "@coinbase/onchainkit/wallet";

export function WasteWise() {
  const navigate = useNavigate();
  const location = useLocation();
  const { address, connector: activeConnector, isConnected } = useAccount();
  //   const { data: ensAvatar } = useEnsAvatar({ address });
  const { isRegistered, currentUser } = useWasteWiseContext();
  //   const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isPending } = useConnect({
    mutation: {
      onSuccess() {
        setTimeout(() => {
          // sdgModal.current?.showModal();
          onOpen();
        }, 800);
      },
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { disconnect } = useDisconnect();
  const [showConnectError, setShowConnectError] = useState<boolean>(false);
  const sdgModal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (error) {
      setShowConnectError(true);
    }
    console.log(error);
    return () => setShowConnectError(false);
  }, [error]);

  // useEffect(() => {
  //   if (isConnected) {
  //     sdgModal.current?.showModal();
  //   }
  //   console.log(isConnected);
  //   // console.log(isSuccess);
  // }, [isConnected]);

  const handleDisconnect = () => {
    disconnect();
    if (location.pathname !== "/") {
      setTimeout(() => {
        navigate("/");
      }, 400);
    }
  };

  const handleConnect = (connector: any) => {
    connect({ connector });
    // Show the modal

    // sdgModal.current?.showModal();
  };

  if (isConnected) {
    return (
      <>
        {!isPending ? (
          <ProfileDropdown
            isRegistered={isRegistered}
            currentUser={currentUser}
          />
        ) : (
          <div className="max-w-40 w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        )}

        {!isRegistered && (
          <Modal
            isDismissable={false}
            size={"2xl"}
            isOpen={isOpen}
            onClose={onClose}
            classNames={{
              backdrop:
                "bg-gradient-to-t from-default-900 to-default-900/10 backdrop-opacity-40",
            }}
          >
            <ModalContent className="px-4 py-8">
              {(onClose) => (
                <>
                  <ModalHeader className="font-firaSans font-bold text-2xl flex flex-col gap-1">
                    Welcome to CarbonWise
                  </ModalHeader>
                  <ModalBody>
                    <div className="text-pretty">
                      We would like you to set a name or pseudonym so that we
                      can personalize your EIA card.
                    </div>
                    {/* <div>
                      Kindly click the signup button to fill in those details.
                    </div> */}
                  </ModalBody>
                  <ModalFooter className="self-start mt-2">
                    <Button as={Link} to="/register" color="default">
                      Set your name
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </>
      // <div className="dropdown flex justify-between lg:w-1/3">
      //   <div className="my-auto text-[#026937] lg:block hidden">
      //     {shortenAddress(address as string)}
      //   </div>

      //   <button className="btn m-1 text-[#026937]" onClick={disconnect as any}>
      //     Disconnect {connector?.name}
      //   </button>
      // </div>
    );
  }
  return (
    <div>
      <div className="dropdown rounded-2xl w-full">
        {/* <label
          tabIndex={0}
          className="btn m-1  border-[#026937] text-[#026937] bg-white hover:bg-[#026937] hover:text-white"
        >
          Connect Wallet
        </label> */}
        {/* <Button
          // name="Connect Wallet"
          size="md"
          customStyle="text-xs lg:text-base"
          type={"button"}
          disabled={!connectors[0].id}
          key={connectors[0].id}
          onClick={() => handleConnect(connectors[0])}
        >
          {isPending ? <span className="loading"></span> : "Connect Wallet"}
        </Button> */}
        {/* <Button
          color="success"
          variant="shadow"
          size="lg"
          onClick={() => handleConnect(connectors[0])}
          type={"button"}
          disabled={!connectors[0].id}
          isLoading={isPending}
        >
          {isPending ? (
            <span className="">Connecting...</span>
          ) : (
            "Connect Wallet"
          )}
        </Button> */}
        <Wallet>
          <ConnectWallet className="bg-success hover:bg-success-700 dark:bg-success-400 dark:hover:bg-success rounded-2xl">
            <ConnectWalletText className="font-firaSans">
              Connect Wallet
            </ConnectWalletText>
          </ConnectWallet>
        </Wallet>
        {/* <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu flex flex-col mt-3"
        >
          {connectors.map((connector) => (
            <li key={connector.id}>
              {console.log(connector)}
              <button
                type={"button"}
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
                className="text-xs font-bold tracking-wide text-white hover:text-white bg-blue-800 hover:bg-blue-600 rounded-lg lg:py-3.5"
              >
                {connector.name}

                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </button>
            </li>
          ))}
        </ul> */}
      </div>

      {!isPending && showConnectError && (
        <div className="hidden">
          {toast.error((error as BaseError).message)}
        </div>
      )}
      {/* {!isLoading && showConnectError && (
        <ToastElem message={(error as BaseError)?.message} toastType="error" />
      )} */}
      {/* {error && <div>{(error as BaseError).shortMessage}</div>} */}
    </div>
  );
}
