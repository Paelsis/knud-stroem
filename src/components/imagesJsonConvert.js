
import imagesJson from '../images/images.json'

export const imagesJsonYear = year => imagesJson.filter(im => year?im.name?year === im.name.substring(0,4):false:false)
export const imagesJsonOlderThanYear = year => imagesJson.filter(im => year?im.name?im.name.substring(0,4).localeCompare(year.substring(0,4)) < 0:true:true)

export const edgesSelected = (edges, year, imagesJsonFilter) => {
  const imagesJsonSelected = imagesJsonFilter(year)
  let edgesSelectedArr = []

  // Find the edges
  imagesJsonSelected.forEach(im => {
    const edgeFound = edges.find(ed => ed.node.fluid.originalName.split('.')[0] === im.originalName);
    if (edgeFound !== undefined) {
      edgesSelectedArr = [...edgesSelectedArr, {...edgeFound, imageJson:im}]
    }
  })  

  // Sort the edges
  return edgesSelectedArr.sort((a, b) => {
    if (a.imageJson.name!==undefined && b.imageJson.name!==undefined) {
      let ret=b.imageJson.name.substring(0, 4).localeCompare(a.imageJson.name.substring(0, 4)) 
      if (ret === 0) {
        ret = a.imageJson.name.substring(4).localeCompare(b.imageJson.name.substring(4))
      } 
      return ret
    } else {
      return -1
    }
  })  
}  
