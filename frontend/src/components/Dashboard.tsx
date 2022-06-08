import React, { useState, useEffect } from "react";

interface album {
  id: number;
  albumName: string;
  bandName: string;
  releaseYear: number;
}

export function Dashboard() {

  const [albums, setAlbums] = useState<album[]>([]);

  // const requestAlbum = () => {
  //   const albums = []
  //   for()
  // } 

  useEffect(() => {
    console.log('use effect')
    listAlbums()
  }, [])

  const renderAlbums = () => {
    const listAlbums = []
    for(let i = 0; i < albums.length; i++) {
      listAlbums.push(
        <p>
        { albums[i].bandName }
        { albums[i].albumName }
        { albums[i].releaseYear }
        </p>
      )
    }
    return listAlbums
  }

  const listAlbums = () => {
    console.log("a")
    fetch("http://localhost:8000/albums/", {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(result => {
      for(let i = 0; i < result.results.length; i++) {
        setAlbums(albums => [...albums, result.results[i]])
      }
    })
    .catch(error => console.log(error))
  }

  return(
    <div>
      {
        renderAlbums()
      }
    </div>
  )
}