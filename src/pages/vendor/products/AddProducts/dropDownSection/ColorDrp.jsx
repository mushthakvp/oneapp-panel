import React, { useState } from 'react'

function ColorDrp({ selected, setSelected, variantIndex }) {
  const [search,setSearch]=useState('')
    const [isOpen, setIsOpen] = React.useState(false);
  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#008000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Gray", hex: "#808080" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Purple", hex: "#800080" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Lime", hex: "#00FF00" },
    { name: "Teal", hex: "#008080" },
    { name: "Navy", hex: "#000080" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Black", hex: "#000000" },
    { name: "Black Blue", hex: "#040720" },
    { name: "Night", hex: "#0C090A" },
    { name: "Charcoal", hex: "#34282C" },
    { name: "Oil", hex: "#3B3131" },
    { name: "Stormy Gray", hex: "#3A3B3C" },
    { name: "Light Black", hex: "#454545" },
    { name: "Dark Steampunk", hex: "#4D4D4F" },
    { name: "Black Cat", hex: "#413839" },
    { name: "Iridium", hex: "#3D3C3A" },
    { name: "Black Eel", hex: "#463E3F" },
    { name: "Black Cow", hex: "#4C4646" },
    { name: "Gray Wolf", hex: "#504A4B" },
    { name: "Vampire Gray", hex: "#565051" },
    { name: "Iron Gray", hex: "#52595D" },
    { name: "Gray Dolphin", hex: "#5C5858" },
    { name: "Carbon Gray", hex: "#625D5D" },
    { name: "Ash Gray", hex: "#666362" },
    { name: "DimGray", hex: "#696969" },
    { name: "Nardo Gray", hex: "#686A6C" },
    { name: "Cloudy Gray", hex: "#6D6968" },
    { name: "Smokey Gray", hex: "#726E6D" },
    { name: "Alien Gray", hex: "#736F6E" },
    { name: "Sonic Silver", hex: "#757575" },
    { name: "Platinum Gray", hex: "#797979" },
    { name: "Granite", hex: "#837E7C" },
    { name: "Gray", hex: "#808080" },
    { name: "Battleship Gray", hex: "#848482" },
    { name: "Sheet Metal", hex: "#888B90" },
    { name: "Dark Gainsboro", hex: "#8C8C8C" },
    { name: "Gunmetal Gray", hex: "#8D918D" },
    { name: "Cold Metal", hex: "#9B9A96" },
    { name: "Stainless Steel Gray", hex: "#99A3A3" },
    { name: "DarkGray", hex: "#A9A9A9" },
    { name: "Chrome Aluminum", hex: "#A8A9AD" },
    { name: "Gray Cloud", hex: "#B6B6B4" },
    { name: "Metal", hex: "#B6B6B6" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Steampunk", hex: "#C9C1C1" },
    { name: "Pale Silver", hex: "#C9C0BB" },
    { name: "Gear Steel Gray", hex: "#C0C6C7" },
    { name: "Gray Goose", hex: "#D1D0CE" },
    { name: "Platinum Silver", hex: "#CECECE" },
    { name: "LightGray", hex: "#D3D3D3" },
    { name: "Silver White", hex: "#DADBDD" },
    { name: "Gainsboro", hex: "#DCDCDC" },
    { name: "Light Steel Gray", hex: "#E0E5E5" },
    { name: "WhiteSmoke", hex: "#F5F5F5" },
    { name: "White Gray", hex: "#EEEEEE" },
    { name: "Platinum", hex: "#E5E4E2" },
    { name: "Metallic Silver", hex: "#BCC6CC" },
    { name: "Blue Gray", hex: "#98AFC7" },
    { name: "Roman Silver", hex: "#838996" },
    { name: "LightSlateGray", hex: "#778899" },
    { name: "SlateGray", hex: "#708090" },
    { name: "Rat Gray", hex: "#6D7B8D" },
    { name: "Slate Granite Gray", hex: "#657383" },
    { name: "Jet Gray", hex: "#616D7E" },
    { name: "Mist Blue", hex: "#646D7E" },
    { name: "Steel Gray", hex: "#71797E" },
    { name: "Marble Blue", hex: "#566D7E" },
    { name: "Slate Blue Gray", hex: "#737CA1" },
    { name: "Light Purple Blue", hex: "#728FCE" },
    { name: "Azure Blue", hex: "#4863A0" },
    { name: "Estoril Blue", hex: "#2F539B" },
    { name: "Blue Jay", hex: "#2B547E" },
    { name: "Charcoal Blue", hex: "#36454F" },
    { name: "Dark Blue Gray", hex: "#29465B" },
    { name: "Dark Slate", hex: "#2B3856" },
    { name: "Deep Sea Blue", hex: "#123456" },
    { name: "Night Blue", hex: "#151B54" },
    { name: "MidnightBlue", hex: "#191970" },
    { name: "Navy", hex: "#000080" },
    { name: "Denim Dark Blue", hex: "#151B8D" },
    { name: "DarkBlue", hex: "#00008B" },
    { name: "Lapis Blue", hex: "#15317E" },
    { name: "New Midnight Blue", hex: "#0000A0" },
    { name: "Earth Blue", hex: "#0000A5" },
    { name: "Cobalt Blue", hex: "#0020C2" },
    { name: "MediumBlue", hex: "#0000CD" },
    { name: "Blueberry Blue", hex: "#0041C2" },
    { name: "Canary Blue", hex: "#2916F5" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Samco Blue", hex: "#0002FF" },
    { name: "Bright Blue", hex: "#0909FF" },
    { name: "Blue Orchid", hex: "#1F45FC" },
    { name: "Sapphire Blue", hex: "#2554C7" },
    { name: "Blue Eyes", hex: "#1569C7" },
    { name: "Bright Navy Blue", hex: "#1974D2" },
    { name: "Balloon Blue", hex: "#2B60DE" },
    { name: "RoyalBlue", hex: "#4169E1" },
    { name: "Ocean Blue", hex: "#2B65EC" },
    { name: "Dark Sky Blue", hex: "#0059FF" },
    { name: "Blue Ribbon", hex: "#306EFF" },
    { name: "Blue Dress", hex: "#157DEC" },
    { name: "Neon Blue", hex: "#1589FF" },
    { name: "DodgerBlue", hex: "#1E90FF" },
    { name: "Glacial Blue Ice", hex: "#368BC1" },
    { name: "SteelBlue", hex: "#4682B4" },
    { name: "Silk Blue", hex: "#488AC7" },
    { name: "Windows Blue", hex: "#357EC7" },
    { name: "Blue Ivy", hex: "#3090C7" },
    { name: "Cyan Blue", hex: "#14A3C7" },
    { name: "Blue Koi", hex: "#659EC7" },
    { name: "Columbia Blue", hex: "#87AFC7" },
    { name: "Baby Blue", hex: "#95B9C7" },
    { name: "CornflowerBlue", hex: "#6495ED" },
    { name: "Sky Blue Dress", hex: "#6698FF" },
    { name: "Iceberg", hex: "#56A5EC" },
    { name: "Butterfly Blue", hex: "#38ACEC" },
    { name: "DeepSkyBlue", hex: "#00BFFF" },
    { name: "Midday Blue", hex: "#3BB9FF" },
    { name: "Crystal Blue", hex: "#5CB3FF" },
    { name: "Denim Blue", hex: "#79BAEC" },
    { name: "Day Sky Blue", hex: "#82CAFF" },
    { name: "LightSkyBlue", hex: "#87CEFA" },
    { name: "SkyBlue", hex: "#87CEEB" },
    { name: "Jeans Blue", hex: "#A0CFEC" },
    { name: "Blue Angel", hex: "#B7CEEC" },
    { name: "Pastel Blue", hex: "#B4CFEC" },
    { name: "Light Day Blue", hex: "#ADDFFF" },
    { name: "Sea Blue", hex: "#C2DFFF" },
    { name: "Heavenly Blue", hex: "#C6DEFF" },
    { name: "Robin Egg Blue", hex: "#BDEDFF" },
    { name: "PowderBlue", hex: "#B0E0E6" },
    { name: "Coral Blue", hex: "#AFDCEC" },
    { name: "LightBlue", hex: "#ADD8E6" },
    { name: "LightSteelBlue", hex: "#B0CFDE" },
    { name: "Gulf Blue", hex: "#C9DFEC" },
    { name: "Pastel Light Blue", hex: "#D5D6EA" },
    { name: "Lavender Blue", hex: "#E3E4FA" },
    { name: "White Blue", hex: "#DBE9FA" },
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Water", hex: "#EBF4FA" },
    { name: "AliceBlue", hex: "#F0F8FF" },
    { name: "GhostWhite", hex: "#F8F8FF" },
    { name: "Azure", hex: "#F0FFFF" },
    { name: "LightCyan", hex: "#E0FFFF" },
    { name: "Light Slate", hex: "#CCFFFF" },
    { name: "Electric Blue", hex: "#9AFEFF" },
    { name: "Tron Blue", hex: "#7DFDFE" },
    { name: "Blue Zircon", hex: "#57FEFF" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Bright Cyan", hex: "#0AFFFF" },
    { name: "Celeste", hex: "#50EBEC" },
    { name: "Blue Diamond", hex: "#4EE2EC" },
    { name: "Bright Turquoise", hex: "#16E2F5" },
    { name: "Blue Lagoon", hex: "#8EEBEC" },
    { name: "PaleTurquoise", hex: "#AFEEEE" },
    { name: "Pale Blue Lily", hex: "#CFECEC" },
    { name: "Light Teal", hex: "#B3D9D9" },
    { name: "Tiffany Blue", hex: "#81D8D0" },
    { name: "Blue Hosta", hex: "#77BFC7" },
    { name: "Cyan Opaque", hex: "#92C7C7" },
    { name: "Northern Lights Blue", hex: "#78C7C7" },
    { name: "Blue Green", hex: "#7BCCB5" },
    { name: "MediumAquaMarine", hex: "#66CDAA" },
    { name: "Aqua Seafoam Green", hex: "#93E9BE" },
    { name: "Magic Mint", hex: "#AAF0D1" },
    { name: "Light Aquamarine", hex: "#93FFE8" },
    { name: "Aquamarine", hex: "#7FFFD4" },
    { name: "Bright Teal", hex: "#01F9C6" },
    { name: "Turquoise", hex: "#40E0D0" },
    { name: "MediumTurquoise", hex: "#48D1CC" },
    { name: "Deep Turquoise", hex: "#48CCCD" },
    { name: "Jellyfish", hex: "#46C7C7" },
    { name: "Blue Turquoise", hex: "#43C6DB" },
    { name: "DarkTurquoise", hex: "#00CED1" },
    { name: "Macaw Blue Green", hex: "#43BFC7" },
    { name: "LightSeaGreen", hex: "#20B2AA" },
    { name: "Seafoam Green", hex: "#3EA99F" },
    { name: "CadetBlue", hex: "#5F9EA0" },
    { name: "Deep Sea", hex: "#3B9C9C" },
    { name: "DarkCyan", hex: "#008B8B" },
    { name: "Teal Green", hex: "#008B8B" },
    { name: "Teal", hex: "#008080" },
    { name: "Teal Blue", hex: "#007C80" },
    { name: "Medium Teal", hex: "#045F5F" },
    { name: "Dark Teal", hex: "#045D5D" },
    { name: "Deep Teal", hex: "#033E3E" },
    { name: "DarkSlateGray", hex: "#25383C" },
    { name: "Gunmetal", hex: "#2C3539" },
    { name: "Blue Moss Green", hex: "#3C565B" },
    { name: "Beetle Green", hex: "#4C787E" },
    { name: "Grayish Turquoise", hex: "#5E7D7E" },
    { name: "Greenish Blue", hex: "#307D7E" },
    { name: "Aquamarine Stone", hex: "#348781" },
    { name: "Sea Turtle Green", hex: "#438D80" },
    { name: "Dull Sea Green", hex: "#4E8975" },
    { name: "Dark Green Blue", hex: "#1F6357" },
    { name: "Deep Sea Green", hex: "#306754" },
    { name: "Bottle Green", hex: "#006A4E" },
    { name: "SeaGreen", hex: "#2E8B57" },
    { name: "Elf Green", hex: "#1B8A6B" },
    { name: "Dark Mint", hex: "#31906E" },
    { name: "Jade", hex: "#00A36C" },
    { name: "Earth Green", hex: "#34A56F" },
    { name: "Chrome Green", hex: "#1AA260" },
    { name: "Mint", hex: "#3EB489" },
    { name: "Emerald", hex: "#50C878" },
    { name: "Isle Of Man Green", hex: "#22CE83" },
    { name: "MediumSeaGreen", hex: "#3CB371" },
    { name: "Metallic Green", hex: "#7C9D8E" },
  ];
    const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex justify-between items-center h-12 gap-[8px] transition-all duration-700 ease-out font-urbanist text-[#1B1B1B]"
    >
      <div className="w-full relative border border-inputBorder rounded-md h-12 flex items-center justify-between px-3">
        {selected && selected[variantIndex] && (
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md"
              style={{
                backgroundColor: selected[variantIndex]?.colorCode,
              }}
            />
            {selected[variantIndex]?.color}
            {!selected[variantIndex]?.color && (
              <span className="opacity-60">Select Color</span>
            )}
          </div>
        )}

        <svg
          className={`cursor-pointer ${
            isOpen ? "rotate-180 duration-700 ease-out" : ""
          }`}
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.4216 0H1.57842C0.264145 0 -0.472617 1.29145 0.339396 2.17182L5.76098 8.05013C6.39099 8.73353 7.60726 8.73353 8.23902 8.05013L13.6606 2.17011C14.4726 1.29145 13.7359 0 12.4216 0Z"
            fill="#1B3865"
          />
        </svg>

        {/* dropElement */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-full z-50 bg-containerWhite absolute left-0 rounded-md duration-700 ease-out  ${
            isOpen ? "h-48 border border-inputBorder top-12" : "h-0 top-10"
          }`}
        >
          <div className="relative h-full right-0 left-0 overflow-y-auto">
            <span className="w-full bg-white sticky top-0 flex items-center justify-center px-1 py-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border h-10 w-full max-w-[97%] border-inputBorder rounded-md p-2"
                placeholder="Search Color"
              />
            </span>

            {/* Display filtered colors */}
            {filteredColors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-6 cursor-pointer p-2 border-b border-inputBorder"
                onClick={() => {
                  setSelected((prevVariants) => {
                    const updatedVariants = [...prevVariants]; // Create a copy of the variants array.

                    // Update the image at the correct getIndex and imagegetIndex.
                    updatedVariants[variantIndex].color = color?.name;
                    updatedVariants[variantIndex].colorCode = color?.hex;

                    // Return the updated variants.
                    return updatedVariants;
                  });
                  setIsOpen(false);
                }}
              >
                <div
                  className="w-[20px] h-[20px] rounded-md text-[14px]"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <p>{color.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorDrp;


