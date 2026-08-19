import { useRef, useState } from 'react';
import { Camera, LoaderCircle, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_SOURCE_BYTES = 8 * 1024 * 1024;
const OUTPUT_EDGE = 320;
const MAX_DATA_URL_LENGTH = 350000;

const createAvatarDataUrl = (file) => new Promise((resolve, reject) => {
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();

  image.onload = () => {
    try {
      const sourceEdge = Math.min(image.naturalWidth, image.naturalHeight);
      if (!sourceEdge) throw new Error('The selected image could not be read.');

      const sourceX = Math.max(0, (image.naturalWidth - sourceEdge) / 2);
      const sourceY = Math.max(0, (image.naturalHeight - sourceEdge) / 2);
      const canvas = document.createElement('canvas');
      canvas.width = OUTPUT_EDGE;
      canvas.height = OUTPUT_EDGE;
      const context = canvas.getContext('2d');
      context.drawImage(image, sourceX, sourceY, sourceEdge, sourceEdge, 0, 0, OUTPUT_EDGE, OUTPUT_EDGE);
      const dataUrl = canvas.toDataURL('image/webp', 0.84);
      if (dataUrl.length > MAX_DATA_URL_LENGTH) {
        throw new Error('This image is still too large after compression. Please choose another photo.');
      }
      resolve(dataUrl);
    } catch (error) {
      reject(error);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    reject(new Error('The selected file is not a readable image.'));
  };

  image.src = objectUrl;
});

export default function ProfileAvatarEditor({ name, avatar, onChange, disabled = false }) {
  const inputRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || 'U';

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!ACCEPTED_TYPES.has(file.type)) {
      toast.error('Choose a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_SOURCE_BYTES) {
      toast.error('Choose an image smaller than 8 MB.');
      return;
    }

    setProcessing(true);
    try {
      const dataUrl = await createAvatarDataUrl(file);
      onChange(dataUrl);
      toast.success('Photo prepared. Save your profile to publish it.');
    } catch (error) {
      toast.error(error.message || 'Unable to prepare this image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-apple-gray-100 bg-apple-gray-50/60 p-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-apple-blue text-white shadow-sm">
        {avatar ? (
          <img src={avatar} alt="Profile preview" className="h-full w-full object-cover" />
        ) : (
          <span className="grid h-full w-full place-items-center text-[28px] font-bold">{initial}</span>
        )}
        <span className="absolute bottom-1 right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-apple-gray-900 text-white shadow-sm" aria-hidden="true">
          <Camera className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold text-apple-gray-900">Profile photo</p>
        <p className="mt-1 text-[12px] leading-5 text-apple-gray-500">JPG, PNG, or WebP. We crop the centre to a square and optimise it before saving.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || processing}
            className="apple-btn apple-btn-secondary apple-btn-sm"
          >
            {processing ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {processing ? 'Preparing…' : avatar ? 'Replace photo' : 'Choose photo'}
          </button>
          {avatar && (
            <button
              type="button"
              onClick={() => onChange('')}
              disabled={disabled || processing}
              className="apple-btn apple-btn-sm border border-red-100 bg-white text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
