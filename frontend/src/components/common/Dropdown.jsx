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
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const selected = multiple ? (value ?? []) : value;

  const safeItems = Array.isArray(item) ? item : [];

  const displayLabel = multiple ? itemName : selected || itemName;

  const isSelected = (id) => {
    if (!multiple) return selected === id;
    return selected.includes(id);
  };

  const toggleItem = (id) => {
    if (!multiple) {
      onChange(id);
      return;
    }

    const exists = selected.includes(id);

    const updated = exists
      ? selected.filter((x) => x !== id)
      : [...selected, id];

    onChange(updated);
  };

  const handleDone = () => {
    onChange(selected);
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
        <span>{displayLabel}</span>

        <span
          className={clsx("flex items-center gap-2 text-sm font-medium", badge)}
        >
          {multiple && selected.length > 0 ? (
            <span className="text-xs text-gray-500">+{selected.length}</span>
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </span>
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
        <div className="py-1 max-h-60 overflow-y-auto">
          {safeItems.map((a, index) => (
            <MenuItem key={index}>
              {() => (
                <button
                  onClick={(e) => {
                    if (multiple) {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleItem(a);
                    } else {
                      toggleItem(a);
                    }
                  }}
                  className={clsx(
                    "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
                    isSelected(a) && "bg-gray-100 font-medium",
                  )}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={isSelected(a)}
                      readOnly
                      className="mr-2"
                    />
                  )}
                  {a}
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
                className="w-full bg-[#964b2b] cursor-pointer text-white py-2 rounded-md hover:opacity-90"
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
