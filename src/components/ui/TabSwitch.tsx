import React from "react";

type TabOption<T = string> = {
  value: T;
  label: string;
};

type TabSwitchProps<T = string> = {
  options: TabOption<T>[];
  activeTab: T;
  onChange: (value: T) => void;
  className?: string;
};

export const TabSwitch = <T extends string>({
  options,
  activeTab,
  onChange,
  className = "",
}: TabSwitchProps<T>) => {
  return (
    <div className={`flex bg-white p-1 rounded-2xl shadow-sm border border-zinc-100 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-6 py-2 rounded-xl text-xs uppercase tracking-widest font-bold transition-all flex-1 ${
            activeTab === option.value
              ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
              : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};