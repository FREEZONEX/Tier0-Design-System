export const downloadBlob = (blob: Blob, filename: string) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

export const downloadFile = async (url: string, preferredFilename?: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const blob = await res.blob();
    const urlParts = url.split('?');
    const pathParts = urlParts[0].split('/');
    const filename = preferredFilename || decodeURIComponent(pathParts[pathParts.length - 1] || 'download');

    downloadBlob(blob, filename);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
