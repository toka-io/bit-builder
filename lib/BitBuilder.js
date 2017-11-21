const fs = require('fs');
const path = require('path');

class BitBuilder {
  constructor() {
    this.findFiles = this.findFiles.bind(this);
  }
  
  /**
   * Peforms a depth first search to find all files (including nested files) in a folder
   * @param {string} root Absoluate path to some root folder
   * @param {array} extList Array of file extensions
   * @return {array} Array of absolute file paths
   */
  findFiles(root, extList) {
    let fileList = [];
    let s = []; // Data structure used for depth first search (DFS) aka a recursive .mp4 search starting at the folder path provided  
    let m = {}; // Temporary data structure for marking visited folders in DFS        
    s.push(root); // Add root

    // Recursively search for audio files and add to the playlist
    while (s.length > 0) {
      let dir = s[s.length-1];
      let files = fs.readdirSync(dir);  
      let end = true;

      // Iterate through folder children
      for(let i = 0; i < files.length; i++) {
        let fPath = path.join(dir, files[i]);

        // Add item to file list if it is a file, else continue search
        if (fs.statSync(path.join(dir, files[i])).isFile()) {
          let arr = files[i].split('\.');
          let ext = arr[arr.length-1];      
          if (extList.includes(ext)) {
            fileList.push(fPath);
          }
        }
        else if (!m.hasOwnProperty(fPath)) {
          // Add folder to stack
          s.push(fPath);
          end = false;
          break;
        }
      }

      // Mark folder as visited
      if (end) m[s.pop()] = true;
    }
    return fileList;
  }
}

module.exports = BitBuilder;