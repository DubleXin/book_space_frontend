import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function HomePage() {
  const [inputVar, setInputVar] = useState<"default" | "success" | "error">(
    "default"
  );
  const [buttonVar, setButtonVer] = useState<"primary" | "ghost">("primary");
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <>
      <h1>Home Page</h1>
      <div className="bg-red-500 text-white p-4">Tailwind works!</div>
      <div className="grid grid-cols-5 gap-1 mt-4">
        <div className="col-start-2">
          <Button
            disabled={false}
            variant={buttonVar}
            size="md"
            onClick={(s) => {
              if (inputValue != "success") {
                setInputVar("error");
                return;
              }
              setButtonVer("ghost");
              setInputVar("success");
              s.currentTarget.disabled = true;
            }}
          >
            Test button
          </Button>
        </div>
        <div className="col-start-4">
          <Input
            variant={inputVar}
            placeholder="Test input"
            value={inputValue}
            onChange={(s) => setInputValue(s.currentTarget.value)}
          />
        </div>
      </div>
    </>
  );
}
