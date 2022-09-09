import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { Tree } from "antd";
import _ from "lodash"
function App() {
  const [tree, setTree] = useState([])
  const recursiveTree = (arrParent = [], arrChild = [], listCategory = []) => {
    for (let itemParent of arrParent) {
      if (itemParent.items.length <= 0) {
        continue
      }
      let listChild = arrChild.filter((itemChild) => {
        return itemParent?.items?.includes(itemChild.category)
      }).map((itemMap) => {
        return {
          'title': itemMap.category,
          'label': itemMap.category,
          "key": makeid(5),
          ...itemMap
        }
      })
      let listTitle = _.map(listChild, 'title')
      let itemDiff = _.difference(itemParent?.items, listTitle)
      if (itemDiff.length > 0 && listTitle.length > 0) {
        let arrNotParent = itemDiff.map((item) => {
          return {
            'title': item,
            'label': item,
            "key": makeid(5),
            'items': []
          }
        })
        listChild = [...listChild, ...arrNotParent]
      }

      itemParent['title'] = itemParent.category
      itemParent['label'] = itemParent.category
      itemParent["key"] = makeid(5)
      if (listChild.length > 0) {
        itemParent['children'] = listChild
        recursiveTree(itemParent['children'], arrChild)
      } else {
        let child = itemParent?.items?.map((itemChild) => {
          return {
            'title': itemChild,
            'label': itemChild,
            "key": makeid(5)
          }
        })
        itemParent['children'] = child
      }
    }
    return arrParent
  }
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
    let arr = _.partition(arrDefault, n => !arrItem.includes(n.category))
    let arrTree = recursiveTree(arr[0], arr[1], listCategory)
    setTree(arrTree)
  }, [])


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
