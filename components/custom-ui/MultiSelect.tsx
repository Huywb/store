import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { IoMdClose } from "react-icons/io";
interface MultiSelectProps {
  placeholder: string;
  collections: collectionsType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections = [],
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputvalue] = useState("");
  const [open, setOpen] = useState(false);

  let selected : collectionsType[]

  if(value.length === 0){
    selected = []
  }else{
    selected = value.map((id)=> collections.find(collection=> collection._id === id)) as collectionsType[]
  }

  const selectables = collections.filter((collection)=>!selected.includes(collection))
  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection)=>(
          <Badge key={collection._id}>{collection.title}
          <button className="ml-1 hover:text-red-600" onClick={()=>onRemove(collection._id)}><IoMdClose></IoMdClose></button>
          </Badge>
        ))}
      <CommandInput
        placeholder={placeholder}
        value={inputValue}
        onValueChange={setInputvalue}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />
      </div>
      

      <div className="relative mt-2">
        {open && (
          <CommandList>
            <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
              {selectables.map((collection: collectionsType) => (
                <CommandItem
                  key={collection._id}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => {
                    onChange(collection._id);
                    setInputvalue("");
                  }}
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  {collection.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
