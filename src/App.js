import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { Tree } from "antd";
import _ from "lodash"
function App() {
  const [tree, setTree] = useState([])
  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  useEffect(() => {
    let arrDefault = [
      {
        "category": "Electronics",
        "items": ["Laptop", "Mobile", "Accessories"]
      },
      {
        "category": "Accessories",
        "items": ["Headphone", "Storage", "Cables"]
      },
      {
        "category": "Headphone",
        "items": ["Shure", "Bose", "JLB"]
      },
      {
        "category": "Cars",
        "items": ["SUV", "Sedan", "Sports"]
      },
      {
        "category": "SUV",
        "items": ["Honda", "Ferrari"]
      },
      {
        "category": "Laptop",
        "items": ["Macbook", "Thinkpad", "Asus"]
      },
      {
        "category": "Storage",
        "items": ["SDCard", "USB", "HDD"]
      },
      {
        "category": "Cables",
        "items": ["Apple", "Ugreen"]
      },
      {
        "category": "Mobile",
        "items": ["iPhone", "Samsung"]
      }
    ]
    let arrItem = []
    let listCategory = []
    for (let item of arrDefault) {
      arrItem = item.items.concat(arrItem)
      listCategory.push(item.category)
    }
    let arrTree = recursive(arrDefault, arrItem, listCategory)
    setTree(arrTree)
  }, [])

  const recursive = (list, arrItem, listCategory) => {
    var map = {}, node, roots = [], i;
    // lấy vị trí của từng item
    for (let i in list) {
      map[list[i].category] = i;
      list[i].children = [];
      list[i].title = list[i].category;
      list[i].key = makeid(5)
    }
    for (let i in list) {
      node = list[i];
      //Thêm node con cho từng item
      let itemDiff = _.difference(list[i].items, listCategory)
      for (let itemChild of itemDiff) {
        let object = {
          'title': itemChild,
          'label': itemChild,
          "key": makeid(5),
        }
        list[i].children.push(object);
      }
      if (arrItem.includes(node.category)) {
        let arrFilter = list.find((item) => {
          return item.items.includes(list[i].category)
        })
        list[map[arrFilter.category]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  return (
    <div className="App">
      <Tree
        checkable
        treeData={tree}
      />
    </div>
  );
}

export default App;
