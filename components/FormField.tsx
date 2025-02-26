import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}: {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title !== "" && (
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      )}

      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};

export default FormField;
