import { StyleSheet } from "react-native";

export default StyleSheet.create({
  profileImgContainer: (imageSizeContainer,edgeColor) => ({
    width: imageSizeContainer,
    height: imageSizeContainer,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: imageSizeContainer / 2,
    // marginTop: -imageSizeContainer / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: edgeColor,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  }),

  editIconContainer:  (imageSizeContainer,editIconContainerSize) => ({
    width: imageSizeContainer,
    height: editIconContainerSize,
    alignItems: "flex-end",
    marginTop: -editIconContainerSize,
  }),
  editIconButton: (editIconContainerSize,edgeColor) => ({
    height: editIconContainerSize,
    width: editIconContainerSize,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: edgeColor,
    opacity: 1,
    borderRadius: editIconContainerSize / 2,
    borderWidth: 0.8,
  }),
});
