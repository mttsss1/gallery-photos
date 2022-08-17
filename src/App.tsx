import { useState, useEffect, FormEvent } from 'react'
import './App.css'
import * as Photos from './context/photos'
import { Photo } from './@types/Photo'
import { PhotoItem } from './components/PhotoItem'

function App() {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    setLoading(false);
    setPhotos(await Photos.getAll());
    setLoading(false);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false)

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`)
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result)
        setPhotos(newPhotoList)
      }
    }
  }

  const handleDeleteClick = async (name: string) => {
    await Photos.deletePhoto(name);
    getPhotos();
  }

  return (
    <div id="container" className="bg-[#27282F] text-white min-h-screen">
      <div id="content" className="m-auto max-w-4xl p-8">
        <div id="header" className="m-0 p-0 text-center mb-8 text-5xl font-bold">
          Galeria de fotos
        </div>

        <form id="upload-form" className="bg-[#3D3F43] p-4 rounded-xl mb-8" method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" className="bg-[#756DF4] text-white p-paddingone text-sm rounded-xl m-marginone cursor-pointer font-bold hover:bg-[#574cf6]" />
          {uploading && "Enviando..."}
        </form>

        {loading &&
          <div id="screen-warning" className="text-center">
            <p className="text-5xl mb-5">✋</p>
            <p >Carregando...</p>
          </div>
        }

        {!loading && photos.length > 0 &&
          <div id="photo-list" className="grid grid-cols-4 gap-2">
            {photos.map((item, index) => (
              <PhotoItem key={index} url={item.url} name={item.name} onDelete={handleDeleteClick} />
            ))}
          </div>
        }

        {!loading && photos.length === 0 &&
          <div id="screen-warning" className="text-center">
            <p className="text-3xl mb-5"> 😞 </p>
            <p className="text-3xl mb-5">Não há fotos cadastradas.</p>
          </div>
        }
      </div>
    </div>
  )
}

export default App
