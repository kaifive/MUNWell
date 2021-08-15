import axios from 'axios';

const fetchData = async (url, user, key) => {
  let response;
  let data = []

  try {
    response = await axios.get(url);

    let i;
    for (i = 0; i < response.data.length; i++) {
      if (response.data[i].user === user) {
        data.push(response.data[i])
      }
    }

    data.sort((data1, data2) => {
      return compareObjects(data1, data2, key)
    })

  } catch (e) {
    throw new Error(e.message)
  }

  return data
}

function compareObjects(object1, object2, key) {
  const obj1 = object1[key]
  const obj2 = object2[key]

  if (obj1 > obj2) {
    return -1
  }
  if (obj1 < obj2) {
    return 1
  }
  return 0
}

export default fetchData