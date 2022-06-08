import React, { useState, useEffect } from "react";
import '../public/dashboard.css';

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
    for (let i = 0; i < albums.length; i++) {
      listAlbums.push(

        <div className='Container'>
          <table>
            <thead>
              <tr>
                <th>Banda</th>
                <th>Album</th>
                <th>Ano</th>
              </tr>
            </thead>
            <tbody>
              <tr key={albums[i].id}>
                <td>{albums[i].bandName}</td>
                <td>{albums[i].albumName}</td>
                <td>{albums[i].releaseYear}</td>
              </tr>

            </tbody>
          </table>
        </div>


        // <p>
        // { albums[i].bandName }
        // { albums[i].albumName }
        // { albums[i].releaseYear }
        // </p>
      )
    }
    return listAlbums
  }

  const listAlbums = () => {
    console.log("a")
    fetch("http://localhost:8000/albums/", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => {
        for (let i = 0; i < result.results.length; i++) {
          setAlbums(albums => [...albums, result.results[i]])
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      {
        renderAlbums()
      }
    </div>
  )
}