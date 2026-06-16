import clsx from "clsx";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({
  item,
  width,
  badge,
  itemName,
  multiple = false,
  value = multiple ? [] : null,
  onChange,
}) => {
  const [tempSelected, setTempSelected] = useState(value);
  const [open, setOpen] = useState(false);

  const isSelected = (id) => {
    if (!multiple) return value?.id === id;
    return tempSelected.includes(id);
  };

  const toggleItem = (id) => {
    if (!multiple) {
      onChange(item.find((i) => i.id === id));
      return;
    }

    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleDone = () => {
    const selectedItems = item.filter((i) => tempSelected.includes(i.id));
    onChange(selectedItems);
  };

  return (
    <Menu
      as="div"
      className="relative inline-block"
      open={open}
      onClose={setOpen}
    >
      <MenuButton
        onClick={() => setOpen(true)}
        className={clsx(
          "inline-flex items-center justify-between gap-x-3 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50",
          width,
        )}
      >
        <span>{itemName}</span>

        <span
          className={clsx("flex items-center gap-2 text-sm font-medium", badge)}
        >
          {multiple && tempSelected.length > 0 ? (
            <span className="text-xs text-gray-500">
              +{tempSelected.length}
            </span>
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </span>
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
        <div className="py-1 max-h-60 overflow-y-auto">
          {item.map((a) => (
            <MenuItem key={a.id}>
              {() => (
                <button
                  onClick={(e) => {
                    if (multiple) {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleItem(a.id);
                    } else {
                      toggleItem(a.id);
                    }
                  }}
                  className={clsx(
                    "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
                    isSelected(a.id) && "bg-gray-100 font-medium",
                  )}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={isSelected(a.id)}
                      readOnly
                      className="mr-2"
                    />
                  )}
                  {a.title}
                </button>
              )}
            </MenuItem>
          ))}
        </div>

        {/* Done button for multiselect */}
        {multiple && (
          <MenuItem>
            {({ close }) => (
              <button
                onClick={() => {
                  handleDone();
                  close();
                }}
                className="w-full bg-[#204161] cursor-pointer text-white py-1 rounded-md hover:opacity-90"
              >
                Done
              </button>
            )}
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
