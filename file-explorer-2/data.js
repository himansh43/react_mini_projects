const data = {
  1: {
    id: 1,
    fileName: "File Explorer",
    type: "folder",
    children: [2, 3, 4, 5, 6, 7, 8],
    parentId:null
  },
  2: {
    id: 2,
    fileName: "node modules",
    type: "folder",
    children: [],
    parentId:1
  },
  3: {
    id: 3,
    fileName: "public",
    type: "folder",
    children: [],
    parentId:1
  },
  4: {
    id: 4,
    fileName: "src",
    type: "folder",
    children: [9],
    parentId:1
  },
  5: {
    id: 5,
    fileName: "gitignore",
    type: "folder",
    children: [],
    parentId:1
  },
  6: {
    id: 6,
    fileName: "package.json",
    type: "folder",
    children: [],
    parentId:1
  },
  7: {
    id: 7,
    fileName: "package-lock.json",
    type: "folder",
    children: [],
    parentId:1
  },
  8: {
    id: 8,
    fileName: "README.md",
    type: "folder",
    children: [],
    parentId:1
  },

    9: {
    id: 9,
    fileName: "App.jsx",
    type: "file",
    children: [],
    parentId:4
  },
};

export default data
