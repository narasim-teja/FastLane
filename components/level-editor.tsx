"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Info, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { CHAIN_ID } from "~/config/constants";
import { OBSTACLES } from "~/config/obctacles";
import { useContract } from "~/hooks/use-contract";
import { useGame } from "~/hooks/use-game";
import { env } from "~/lib/env";
import { api } from "~/lib/trpc/react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const NUMBER_OF_COLUMNS = 5;
const NUMBER_OF_ROWS = 8;

type Selection = {
  obstacle: string | null;
  column: number | null;
};

export function LevelEditor() {
  const contract = useContract();
  const router = useRouter();

  const { addSegment, setRowCount, isEditorOpen, toggleEditor, togglePause } =
    useGame();

  const { mutate: updateObstacles } = api.ws.updateObstacles.useMutation();

  const [currentRow, setCurrentRow] = React.useState<number>(0);
  const [selections, setSelections] = React.useState<Selection[]>(
    Array(NUMBER_OF_ROWS).fill({ obstacle: null, column: null })
  );

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
        (sel, i) =>
          i > currentRow && (sel.obstacle === null || sel.column === null)
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

        updateObstacles(undefined, {
          onSuccess: ({ obstacles, rowCount, refresh }) => {
            setRowCount(rowCount);
            addSegment(obstacles);
            toggleEditor(false);
            togglePause(false);
            if (refresh) {
              router.refresh(); // Refresh the page
            }
          },
        });
      }
    } catch (error) {
      console.error("Error submitting obstacles to the blockchain:", error);
    }
  }

  function setRandomObstacles() {
    const randomObstacle = () =>
      OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)].value;

    setSelections((prev) =>
      prev.map(() => ({
        obstacle: randomObstacle(),
        column: Math.floor(Math.random() * NUMBER_OF_COLUMNS),
      }))
    );
  }

  return (
    <Dialog open={isEditorOpen}>
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
                {OBSTACLES.map(({ label, description, value, image }, i) => {
                  const Img = ({ width = 100, height = 100 }) => (
                    <Image
                      src={image}
                      alt={label}
                      width={width}
                      height={height}
                      className="aspect-square w-full rounded-md border object-cover"
                    />
                  );

                  return (
                    <div
                      key={i}
                      onClick={() => handleObstacleSelection(value)}
                      className={cn(
                        "relative size-20",
                        selections[currentRow].obstacle === value &&
                          "rounded-md ring-2 ring-ring ring-offset-2 ring-offset-background"
                      )}
                    >
                      <Img />

                      <HoverCard>
                        <HoverCardTrigger className="absolute right-1 top-1 cursor-pointer overflow-hidden rounded-full bg-background/50 p-0.5">
                          <Info className="size-3.5" />
                        </HoverCardTrigger>

                        <HoverCardContent side="right" className="font-matter">
                          <Img height={400} width={400} />

                          <p className="text-lg font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">
                            {description}
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
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
                          "rounded border",
                          i === j && "bg-muted group-hover:animate-bounce",
                          className
                        )}
                      />
                    ));

                  return (
                    <div
                      key={i}
                      onClick={() => handleColumnSelection(i)}
                      className={cn(
                        "group flex size-20 cursor-pointer items-center justify-center gap-px overflow-hidden rounded-md border",
                        selections[currentRow].column === i &&
                          "ring-2 ring-ring ring-offset-2 ring-offset-background"
                      )}
                    >
                      <Segments className="size-3" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Choose Row</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={setRandomObstacles}
                    className={cn(
                      "size-8",
                      env.NODE_ENV === "production" && "hidden"
                    )}
                  >
                    <RefreshCw className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  Select random obstacles for each row.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: NUMBER_OF_ROWS }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentRow(i)}
                  className={cn(
                    "cursor-pointer rounded-md border bg-black/10 px-1 py-2 text-center",
                    selections[i].obstacle !== null &&
                      selections[i].column !== null &&
                      "border-green-500 bg-green-400 text-background",
                    currentRow === i &&
                      "ring-2 ring-ring ring-offset-2 ring-offset-background"
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
