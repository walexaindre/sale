export function downloadFile(filename: string, type: string, Data: any) {
    const blob = new Blob([Data], {
        type: type,
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}