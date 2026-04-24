import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Photo {
  id: string;
  image_url: string;
  caption: string;
  event_name: string;
  photo_date: string;
  likes: number;
  is_featured: boolean;
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('community-admin', {
        body: { action: 'list', table: 'gallery_photos' },
      });
      if (error) throw error;
      setPhotos(data || []);
    } catch (err) {
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (photo: Photo, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPhotos.has(photo.id)) return;

    setLikedPhotos((prev) => new Set([...prev, photo.id]));
    setPhotos((prev) =>
      prev.map((p) => (p.id === photo.id ? { ...p, likes: p.likes + 1 } : p))
    );

    try {
      await supabase.functions.invoke('community-admin', {
        body: { action: 'like_photo', table: 'gallery_photos', id: photo.id },
      });
    } catch (err) {
      console.error('Error liking photo:', err);
    }
  };

  const filteredPhotos = filter === 'featured' ? photos.filter((p) => p.is_featured) : photos;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="photo-gallery" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Captured Moments</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
            Photo Gallery
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Relive the magic from our classes, socials, and events. Every photo tells a story of rhythm, connection, and joy.
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-white text-gray-900'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            All Photos
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'featured'
                ? 'bg-white text-gray-900'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Featured
          </button>
        </div>

        {/* Gallery Grid - Masonry-style */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`bg-gray-800 rounded-xl animate-pulse ${i % 3 === 0 ? 'row-span-2 h-96' : 'h-48'}`}
              />
            ))}
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filteredPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.image_url}
                  alt={photo.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium line-clamp-2 mb-2">{photo.caption}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-xs">{photo.event_name}</span>
                      <button
                        onClick={(e) => handleLike(photo, e)}
                        className={`flex items-center gap-1.5 transition-all ${
                          likedPhotos.has(photo.id) ? 'text-red-400' : 'text-white/70 hover:text-red-400'
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill={likedPhotos.has(photo.id) ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span className="text-xs font-medium">{photo.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Featured badge */}
                {photo.is_featured && (
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-amber-400 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <img
                src={selectedPhoto.image_url}
                alt={selectedPhoto.caption}
                className="w-full max-h-[75vh] object-contain rounded-xl"
              />

              {/* Info */}
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <p className="text-white font-medium text-lg">{selectedPhoto.caption}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/50 text-sm">{selectedPhoto.event_name}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/50 text-sm">{formatDate(selectedPhoto.photo_date)}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleLike(selectedPhoto, e)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    likedPhotos.has(selectedPhoto.id)
                      ? 'bg-red-600/20 text-red-400'
                      : 'bg-white/10 text-white/70 hover:bg-red-600/20 hover:text-red-400'
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={likedPhotos.has(selectedPhoto.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="font-medium">{selectedPhoto.likes}</span>
                </button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    const idx = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
                    if (idx > 0) setSelectedPhoto(filteredPhotos[idx - 1]);
                  }}
                  className="text-white/40 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button
                  onClick={() => {
                    const idx = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
                    if (idx < filteredPhotos.length - 1) setSelectedPhoto(filteredPhotos[idx + 1]);
                  }}
                  className="text-white/40 hover:text-white transition-colors flex items-center gap-2"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
