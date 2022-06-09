import React, { useState, useEffect } from "react";


import '../public/dashboard.css';

interface Album {
  id: number;
  albumName: string;
  bandName: string;
  releaseYear: number;
  tracks: [Track]
}

interface Track {
  id: number;
  trackName: string;
  releaseYear: number;
  album: number;
}

export function Dashboard() {

  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumNameAlbumForm, setAlbumNameAlbumForm] = useState("");
  const [bandNameAlbumForm, setBandNameAlbumForm] = useState("");
  const [releaseYearAlbumForm, setReleaseYearAlbumForm] = useState("");

  const [trackNameTrackForm, setTrackNameTrackForm] = useState("");
  const [releaseYearTrackForm, setReleaseYearTrackForm] = useState("");
  const [albumIdTrackForm, setAlbumIdTrackForm] = useState(0);

  useEffect(() => {
    listAlbums()
  }, [])

  const renderAlbums = () => {
    const listOfAlbums = []
    for (let i = 0; i < albums.length; i++) {
      if (albums[i].tracks.length > 0) {
        listOfAlbums.push(
          <div>
            <div id={"" + albums[i].id} key={albums[i].id}>
              Banda: {albums[i].bandName} | Álbum: {albums[i].albumName} | Ano: {albums[i].releaseYear}
              <button id={"" + albums[i].id} onClick={() => {
                fetch(`http://localhost:8000/albums/${albums[i].id}/`, {
                  method: 'DELETE',
                  headers: {'Content-Type': 'application/json'},
                })
                .then(() => {
                  listAlbums()
                })
                .catch(error => console.log(error))
              }} style={{ float: "right", backgroundColor: "red" }}>Remover Álbum</button>
            </div>
            <div>
              {
                albums[i].tracks.map(track => {
                  return (
                    <div>
                      Música: {track.trackName} | Ano: {track.releaseYear}
                      <button id={"" + track.id} style={{ float: "right", backgroundColor: "red" }} onClick={() => {
                        fetch(`http://localhost:8000/tracks/${track.id}/`, {
                          method: 'DELETE',
                          headers: {'Content-Type': 'application/json'},
                        })
                        .then(() => {
                          listAlbums()
                        })
                        .catch(error => console.log(error))
                      }}>Remover Música</button>
                    </div>
                  )
                })
              }
            </div>
            <hr></hr>
          </div>
        )
      } else {
        listOfAlbums.push(
          <div>
            <div id={"" + albums[i].id} key={albums[i].id}>
              Banda: {albums[i].bandName} | Álbum: {albums[i].albumName} | Ano: {albums[i].releaseYear}
              <button id={"" + albums[i].id} onClick={() => {
                fetch(`http://localhost:8000/albums/${albums[i].id}/`, {
                  method: 'DELETE',
                  headers: {'Content-Type': 'application/json'},
                })
                .then(() => {
                  listAlbums()
                })
                .catch(error => console.log(error))
              }} style={{ float: "right", backgroundColor: "red" }}>Remover Álbum</button>
            </div>
            <hr></hr>
          </div>
        )
      }
    }
    return listOfAlbums
  }

  const listAlbums = () => {
    fetch("http://localhost:8000/albums/", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => {
        setAlbums([])
        for (let i = 0; i < result.results.length; i++) {
          if (i == 0) {
            setAlbumIdTrackForm(result.results[i].id)
          }
          setAlbums(albums => [...albums, result.results[i]])
        }
      })
      .catch(error => console.log(error))
  }

  const handleChangeAlbumName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumNameAlbumForm(event.currentTarget.value);
  }

  const handleChangeBandName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBandNameAlbumForm(event.currentTarget.value);
  }

  const handleChangeReleaseYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReleaseYearAlbumForm(event.currentTarget.value);
  }

  const handleSubmitAlbum = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:8000/albums/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                albumName: albumNameAlbumForm,
                bandName: bandNameAlbumForm,
                releaseYear: releaseYearAlbumForm
            }),
        })
        .then(response => {
          if (response.status === 201) {
            return response.json()
          } else {
            console.log("Error!")
          }
        })
        .then(() => {
          setAlbumNameAlbumForm("")
          setBandNameAlbumForm("")
          setReleaseYearAlbumForm("")
          listAlbums()
        })
        .catch(error => console.log(error))
  }

  const handleSubmitTrack = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:8000/tracks/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                trackName: trackNameTrackForm,
                releaseYear: releaseYearTrackForm,
                album: albumIdTrackForm
            }),
        })
        .then(response => {
          if (response.status === 201) {
            return response.json()
          } else {
            console.log("Error!")
          }
        })
        .then(() => {
          setTrackNameTrackForm("")
          setReleaseYearTrackForm("")
          listAlbums()
        })
        .catch(error => console.log(error))
  }

  return (
    <div>
      <label>Criar Novo Álbum:</label>
      <form onSubmit={handleSubmitAlbum}>
        <input type="text" value={albumNameAlbumForm} onChange={(event) => handleChangeAlbumName(event)} placeholder="Nome do Álbum" />
        <input type="text" value={bandNameAlbumForm} onChange={(event) => handleChangeBandName(event)} placeholder="Nome da Banda" />
        <input type="text" value={releaseYearAlbumForm} onChange={(event) => handleChangeReleaseYear(event)} placeholder="Data de Lançamento" />
        <input style={{ float: "right", backgroundColor: "green" }} type="submit" value="Criar Novo Álbum" />
      </form>
      <label>Criar Nova Música:</label>
      <form onSubmit={handleSubmitTrack}>
        <input type="text" value={trackNameTrackForm} onChange={(event) => setTrackNameTrackForm(event.currentTarget.value)} placeholder="Nome da Música" />
        <input type="text" value={releaseYearTrackForm} onChange={(event) => setReleaseYearTrackForm(event.currentTarget.value)} placeholder="Data de Lançamento" />
        <select value={albumIdTrackForm} onChange={(event) => setAlbumIdTrackForm(Number(event.target.value))}>
          {
            albums.map(album => {
              return (
                <option value={album.id}>{album.albumName}</option>
              )
            })
          }
        </select>
        <input style={{ float: "right", backgroundColor: "green" }} type="submit" value="Criar Nova Música" />
      </form>
      <hr></hr>
      {
        renderAlbums()
      }
    </div>
  )
}