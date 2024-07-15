"use client";

import React from "react";
import Image from "next/image";

import { toast } from "sonner";

import { CHAIN_ID } from "~/config/constants";
import { useContract } from "~/hooks/use-contract";
import { useGame } from "~/hooks/use-game";
import { cn } from "~/lib/utils";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const OBSTACLE_OPTIONS = [
  { label: "None", value: "null", image: "/placeholder.svg" },
  { label: "Whale Obstacle", value: "1", image: "/images/whale_obstacle.png" },
  { label: "Text Obstacle", value: "2", image: "/images/wagmi_obstacle.png" },
  { label: "Poop Obstacle", value: "3", image: "/images/poop_obstacle.webp" },
  {
    label: "Candle Obstacle",
    value: "4",
    image: "/images/candle_obstacle.webp",
  },
];

const NUMBER_OF_COLUMNS = 5;
const NUMBER_OF_ROWS = 8;

type Selection = {
  obstacle: string | null;
  column: number | null;
};

export function LevelEditor() {
  const contract = useContract();

  const { segments, addSegment, isEditorOpen } = useGame();

  const [currentRow, setCurrentRow] = React.useState<number>(0);
  const [selections, setSelections] = React.useState<Selection[]>(
    Array(NUMBER_OF_ROWS).fill({ obstacle: null, column: null })
  );

  const shouldOpenEditor =
    isEditorOpen && segments[segments.length - 1].obstacles.length <= 10;

  function handleObstacleSelection(value: string) {
    setSelections((prev) =>
      prev.map((sel, i) =>
        i === currentRow ? { ...sel, obstacle: value } : sel
      )
    );
  }

  function handleColumnSelection(value: number) {
    setSelections((prev) =>
      prev.map((sel, i) => (i === currentRow ? { ...sel, column: value } : sel))
    );
  }

  React.useEffect(() => {
    const currentSelection = selections[currentRow];

    if (
      currentSelection.obstacle !== null &&
      currentSelection.column !== null
    ) {
      const nextRow = selections.findIndex(
        (sel) => sel.obstacle === null && sel.column === null
      );

      if (nextRow !== -1) {
        setCurrentRow(nextRow);
      }
    }
  }, [selections, currentRow]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isAllRowsFilled = selections.every(
      (sel) => sel.obstacle !== null && sel.column !== null
    );

    if (!isAllRowsFilled) {
      toast.error("An error occurred", {
        description: "Please fill all rows before submitting.",
      });

      return;
    }

    const resultArray = Array(NUMBER_OF_COLUMNS * NUMBER_OF_ROWS).fill(
      0
    ) as number[];

    selections.forEach((sel, i) => {
      if (
        sel.obstacle !== null &&
        sel.obstacle !== "null" &&
        sel.column !== null
      ) {
        resultArray[sel.column + i * NUMBER_OF_COLUMNS] = parseInt(
          sel.obstacle
        );
      }
    });

    // Append 10 zeros to the resultArray
    const extendedResultArray = resultArray.concat(Array(10).fill(0));

    try {
      if (contract) {
        await contract.addSegment(CHAIN_ID, extendedResultArray);
        addSegment(extendedResultArray);
      }
    } catch (error) {
      console.error("Error submitting obstacles to the blockchain:", error);
    }
  }

  return (
    <Dialog open={shouldOpenEditor}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-scroll">
        <DialogHeader className="space-y-0">
          <DialogTitle className="font-cal text-3xl tracking-wide md:text-4xl">
            Level Editor
          </DialogTitle>
          <DialogDescription>
            Create a new segment by selecting obstacles for each row.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Choose Obstacle</h2>
              <div className="grid grid-cols-3 gap-4">
                {OBSTACLE_OPTIONS.map(({ label, value, image }, i) => {
                  const Img = ({ width = 100, height = 100 }) => (
                    <Image
                      src={image}
                      alt={label}
                      width={width}
                      height={height}
                      className="aspect-square w-full rounded-md border border-black/15 object-cover"
                    />
                  );

                  return (
                    <HoverCard key={i} openDelay={300}>
                      <HoverCardTrigger
                        onClick={() => handleObstacleSelection(value)}
                        className={cn(
                          "size-20 cursor-pointer overflow-hidden rounded-md",
                          selections[currentRow].obstacle === value &&
                            "ring-2 ring-ring ring-offset-2"
                        )}
                      >
                        <Img />
                      </HoverCardTrigger>

                      <HoverCardContent side="right" className="space-y-4">
                        <Img height={400} width={400} />
                        <p className="font-matter text-lg font-medium">
                          {label}
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Obstacle Placement</h2>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: NUMBER_OF_COLUMNS }).map((_, i) => {
                  const Segments = ({ className = "" }) =>
                    Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className={cn(
                          "rounded border border-black/20",
                          i === j && "bg-secondary",
                          className
                        )}
                      />
                    ));

                  return (
                    <HoverCard key={i} openDelay={300}>
                      <HoverCardTrigger
                        onClick={() => handleColumnSelection(i)}
                        className={cn(
                          "flex size-20 cursor-pointer items-center justify-center gap-px overflow-hidden rounded-md border border-black/15",
                          selections[currentRow].column === i &&
                            "ring-2 ring-ring ring-offset-2"
                        )}
                      >
                        <Segments className="size-3" />
                      </HoverCardTrigger>

                      <HoverCardContent side="left" className="space-y-4">
                        <div className="flex aspect-square w-full items-center justify-center gap-2 rounded-md border border-black/15">
                          <Segments className="size-8" />
                        </div>

                        <p className="font-matter text-lg font-medium">
                          Column {i + 1}
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Choose Row</h2>
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: NUMBER_OF_ROWS }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentRow(i)}
                  className={cn(
                    "cursor-pointer rounded-md border border-black/15 bg-black/10 px-1 py-2 text-center",
                    selections[i].obstacle !== null &&
                      selections[i].column !== null &&
                      "border-green-500 bg-green-400",
                    currentRow === i && "ring-2 ring-ring ring-offset-2"
                  )}
                >
                  <p className="font-matter">Row {i + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full justify-end gap-2">
            <DialogClose asChild>
              <Button disabled type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>

            <Button>Create Segment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
