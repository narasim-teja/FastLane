import React from "react";

import type { Obstacles } from "~/types/misc";
import { useContract } from "~/hooks/use-contract";
import { CHAIN_ID } from "~/lib/constants/globals";

const obstacleOptions = [
  { label: "None", value: null, image: "/images/none.png" },
  { label: "Whale Obstacles", value: "1", image: "/images/whale_obstacle.png" },
  { label: "Text Obstacle", value: "2", image: "/images/wagmi_obstacle.png" },
  { label: "Poop Obstacle", value: "3", image: "/images/poop_obstacle.webp" },
  { label: "Green Candle", value: "4", image: "/images/candle_obstacle.webp" },
];

const NUMBER_OF_COLUMNS = 5;
const NUMBER_OF_ROWS = 8;

interface LevelEditorProps {
  onObstaclesSelected: (obstacles: Obstacles) => void;
}

interface Selection {
  obstacle: string | null;
  column: number | null;
}

export function LevelEditor({ onObstaclesSelected }: LevelEditorProps) {
  const contract = useContract();

  const [selections, setSelections] = React.useState<Selection[]>(
    Array(NUMBER_OF_ROWS).fill({ obstacle: null, column: null }),
  );

  function handleObstacleChange(index: number, value: string | null) {
    const newSelections = selections.map((sel, i) =>
      i === index ? { ...sel, obstacle: value } : sel,
    );
    setSelections(newSelections);
  }

  function handleColumnChange(index: number, column: number) {
    const newSelections = selections.map((sel, i) =>
      i === index ? { ...sel, column: column } : sel,
    );
    setSelections(newSelections);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const resultArray = Array(NUMBER_OF_COLUMNS * NUMBER_OF_ROWS).fill(
      0,
    ) as number[];

    selections.forEach((sel, i) => {
      if (sel.obstacle !== null && sel.column !== null) {
        resultArray[sel.column + i * NUMBER_OF_COLUMNS] = parseInt(
          sel.obstacle,
        );
      }
    });

    // Append 10 zeros to the resultArray
    const extendedResultArray = resultArray.concat(Array(10).fill(0));

    try {
      await contract?.addSegment(CHAIN_ID, extendedResultArray);
      onObstaclesSelected(extendedResultArray);
    } catch (error) {
      console.error("Error submitting obstacles to the blockchain:", error);
    }
  }

  return (
    <div className="fixed left-1/2 top-1/2 z-50 flex max-h-[80vh] -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-y-auto rounded-md bg-white p-5">
      <form onSubmit={handleSubmit}>
        <p className="mb-2.5 text-left font-bold">
          Select the obstacles in order for the next segment:
        </p>
        {Array.from({ length: NUMBER_OF_ROWS }).map((_, index) => (
          <div key={index} className="mb-5 flex w-full items-center gap-4">
            <div className="mb-2.5 w-fit text-left font-bold">
              Obstacle {index + 1}:
            </div>
            {obstacleOptions.map((option) => (
              <label
                key={option.value}
                className="flex grow items-center justify-start gap-2"
              >
                <input
                  type="radio"
                  name={`obstacle-${index}`}
                  value={option.value ?? ""}
                  checked={selections[index]?.obstacle === option.value}
                  onChange={() => handleObstacleChange(index, option.value)}
                  className="border border-[#4CAF50]"
                />
                <img
                  src={option.image}
                  alt={option.label}
                  className="ml-1.5 size-20 rounded-md border border-[#4CAF50]"
                />
              </label>
            ))}
            <div className="mt-1.5 flex items-center">
              {Array.from({ length: NUMBER_OF_COLUMNS }).map((_, colIndex) => (
                <label key={colIndex}>
                  <input
                    type="checkbox"
                    checked={selections[index]?.column === colIndex}
                    onChange={() => handleColumnChange(index, colIndex)}
                    className="ml-1.5"
                  />
                  {colIndex + 1}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="mt-5 cursor-pointer rounded-md border-none bg-[#4CAF50] px-5 py-2.5 text-white outline-none"
        >
          Create Segment
        </button>
      </form>
    </div>
  );
}
