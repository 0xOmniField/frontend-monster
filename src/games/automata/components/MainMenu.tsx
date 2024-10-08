import React, { useEffect, useState, useRef, useCallback } from "react";
import circleBackground from "../images/backgrounds/circle_new.png";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuProgram from "./MainMenuProgram";
import ConfirmButton from "./Buttons/ConfirmButton";
import UnlockButton from "./Buttons/UnlockButton";
import "./MainMenu.css";
import RebootButton from "./Buttons/RebootButton";
import DiffResourcesInfo from "./DiffResourcesInfo";
import Rocket from "./Rocket";
import { getTransactionCommandArray } from "../rpc";
import { selectL2Account } from "../../../data/accountSlice";
import { sendTransaction, queryState } from "../request";
import {
  getCreatureIconPath,
  ProgramInfo,
} from "../../../data/automata/models";
import {
  UIState,
  selectIsLoading,
  selectIsSelectingUIState,
  selectUIState,
  selectNonce,
  setUIState,
} from "../../../data/automata/properties";
import {
  startRebootCreature,
  clearRebootCreature,
  selectIsNotSelectingCreature,
  selectSelectedCreature,
  selectSelectedCreaturePrograms,
  selectSelectedCreatureDiffResources,
  selectSelectedCreatureListIndex,
  selectSelectedCreatureCurrentProgram,
  selectSelectedCreatureSelectingProgram,
  selectSelectedCreatureIndex,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import MainMenuWarning from "./MainMenuWarning";
import MainMenuProgressBar from "./MainMenuProgressBar";
import SummaryMenu from "./SummaryMenu";
// import SpineAnimation from "../../../components/SpineAnimation";

interface Props {
  localTimer: number;
}

const MainMenu = ({ localTimer }: Props) => {
  const lightingLeftRef = useRef<HTMLDivElement>(null);
  const lightingRightRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const zombieRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const uIState = useAppSelector(selectUIState);
  const nonce = useAppSelector(selectNonce);
  const isNotSelectingCreature = useAppSelector(selectIsNotSelectingCreature);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const selectedCreatureDiffResources = useAppSelector(
    selectSelectedCreatureDiffResources
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isCreatingUIState = uIState == UIState.Creating;
  const showConfirmButton = uIState == UIState.Reboot;
  const enableConfirmButton = selectedCreaturePrograms.every(
    (program) => program !== null
  );
  const showUnlockButton = uIState == UIState.Creating;
  const enableUnlockButton = selectedCreaturePrograms.every(
    (program) => program !== null
  );
  const isLoading = useAppSelector(selectIsLoading);
  const showRebootButton = uIState == UIState.Idle;
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );
  const showSummaryMenu = isNotSelectingCreature && uIState != UIState.Guide;
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  function onClickUnlock() {
    if (uIState == UIState.Creating) {
      setShowUnlockAnimation(true);
      setTimeout(() => {
        setShowUnlockAnimation(false);
        onClickConfirm();
      }, 1000);
    }
  }

  function onClickConfirm() {
    if (!isLoading) {
      // bugs here, after creating a new creature, the list will refresh unproperly.
      // fix it after UI done polishing creature list since it may change the layout of the creating creature.
      const isCreating = uIState == UIState.Creating;
      dispatch(setUIState({ uIState: UIState.Loading }));
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(
            nonce,
            selectedCreature.programIndexes.map((index) => index!),
            selectedCreatureIndexForRequestEncode,
            isCreating
          ),
          prikey: l2account!.address,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ cmd: [], prikey: l2account!.address })).then(
            (action) => {
              if (queryState.fulfilled.match(action)) {
                dispatch(setUIState({ uIState: UIState.Idle }));
                dispatch(clearRebootCreature({}));
              } else {
                dispatch(setUIState({ uIState: UIState.Idle }));
                dispatch(clearRebootCreature({}));
              }
            }
          );
        } else if (sendTransaction.rejected.match(action)) {
          dispatch(setUIState({ uIState: UIState.Idle }));
        }
      });
    }
  }

  function onClickReboot() {
    if (!isLoading) {
      dispatch(setUIState({ uIState: UIState.Reboot }));
      dispatch(startRebootCreature({}));
    }
  }

  const currentProgramInfo = useAppSelector(
    isSelectingUIState
      ? selectSelectedCreatureSelectingProgram
      : selectSelectedCreatureCurrentProgram(localTimer)
  );

  const triggerAnimation = () => {
    // 控制动画顺序
    setTimeout(() => {
      discRef?.current?.classList?.add("show");
    }, 0);
    setTimeout(() => {
      lightingRightRef?.current?.classList?.add("show");
    }, 0);

    setTimeout(() => {
      zombieRef.current?.classList.add("show");
    }, 700); // 20帧，假设每帧约10ms

    setTimeout(() => {
      lightingLeftRef?.current?.classList?.add("show");
    }, 4470); // 40帧
  };

  const selectedCreatureIndex = useAppSelector(selectSelectedCreatureIndex);
  const [lastProgramInfo, setLastProgramInfo] = useState(currentProgramInfo);
  const [lastSelectedCreatureIndex, setLastSelectedCreatureIndex] = useState(
    selectedCreatureIndex
  );

  useEffect(() => {
    setLastSelectedCreatureIndex(selectedCreatureIndex);
    setLastProgramInfo(currentProgramInfo);
  }, [selectedCreatureIndex]);

  useEffect(() => {
    if (
      !isSelectingUIState &&
      selectedCreatureIndex == lastSelectedCreatureIndex &&
      lastProgramInfo.index != currentProgramInfo.index
    ) {
      setLastProgramInfo(currentProgramInfo);
      triggerAnimation();
    }
  }, [
    currentProgramInfo.remainTime,
    isSelectingUIState,
    selectedCreatureIndex,
    lastSelectedCreatureIndex,
    lastProgramInfo.index,
    currentProgramInfo.index,
  ]);

  return (
    <>
      <div className="main">
        <div className="main-pillars">
          <div className="main-pillars-base" />
          <div className="main-pillars-animation" />
        </div>
        <div
          ref={lightingRightRef}
          className={`lighting-animation-right`}
          onAnimationEnd={() => {
            lightingRightRef?.current?.classList?.remove("show");
          }}
        />
        <div ref={zombieRef} className={`main-zombie-open-animation`} />
        <div className={`main-zombie-open-animation show hidden`} />
        <div
          ref={lightingLeftRef}
          className={`lighting-animation-left`}
          onAnimationEnd={() => {
            lightingLeftRef?.current?.classList?.remove("show");
            zombieRef?.current?.classList?.remove("show");
          }}
        />

        <Rocket />
        {!isNotSelectingCreature && (
          <div className="main-content">
            <div className="main-info-container">
              <DiffResourcesInfo
                diffResources={selectedCreatureDiffResources}
              />
            </div>
            <div className="main-circle-container">
              <div
                ref={discRef}
                className={`main-circle-container-new`}
                onAnimationEnd={() => {
                  discRef?.current?.classList?.remove("show");
                }}
              ></div>
              <MainMenuProgressBar
                programName={currentProgramInfo.program?.name ?? ""}
                remainTime={currentProgramInfo.remainTime}
                progress={currentProgramInfo.progress}
                iconPath={getCreatureIconPath(selectedCreature.creatureType)}
                isCreating={isCreatingUIState}
                showAnimation={showUnlockAnimation}
              />
              <div className="main-circle-background"></div>
              <MainMenuSelectingFrame
                order={currentProgramInfo.index}
                isCurrentProgram={!isSelectingUIState}
                isStop={selectedCreature.isProgramStop}
              />
              {showUnlockAnimation && (
                <div className="main-bot-creating-animation" />
              )}
              {selectedCreaturePrograms.map((program, index) => (
                <MainMenuProgram
                  key={index}
                  isCurrent={
                    !isSelectingUIState && currentProgramInfo.index == index
                  }
                  isStop={selectedCreature.isProgramStop}
                  order={index}
                  program={program}
                  showingAnimation={isSelectingUIState}
                />
              ))}
              <MainMenuWarning />
              {showConfirmButton && (
                <ConfirmButton
                  isDisabled={!enableConfirmButton}
                  onClick={() => onClickConfirm()}
                />
              )}
              {showUnlockButton && (
                <UnlockButton
                  isDisabled={!enableUnlockButton}
                  onClick={() => onClickUnlock()}
                />
              )}
              {showRebootButton && (
                <RebootButton onClick={() => onClickReboot()} />
              )}
            </div>
          </div>
        )}
        {showSummaryMenu && <SummaryMenu />}
      </div>
    </>
  );
};

export default MainMenu;
