// Detects faces with Apple's Vision framework and prints, per image, the
// largest face box as fractions of the image: slug<TAB>cx<TAB>cy<TAB>size
// Coordinates are top-left origin. Used by crop-faces.mjs.
//
// Usage: swift scripts/detect-faces.swift <image>...

import Foundation
import Vision
import AppKit

for arg in CommandLine.arguments.dropFirst() {
    let url = URL(fileURLWithPath: arg)
    let name = url.deletingPathExtension().lastPathComponent

    guard let image = NSImage(contentsOf: url),
          let cg = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        print("\(name)\tERROR\tload")
        continue
    }

    let request = VNDetectFaceRectanglesRequest()
    let handler = VNImageRequestHandler(cgImage: cg, options: [:])
    do {
        try handler.perform([request])
    } catch {
        print("\(name)\tERROR\tvision")
        continue
    }

    guard let faces = request.results, !faces.isEmpty else {
        print("\(name)\tNONE")
        continue
    }

    // Largest face = the subject, not a background spectator.
    let face = faces.max { $0.boundingBox.width * $0.boundingBox.height
                         < $1.boundingBox.width * $1.boundingBox.height }!
    let b = face.boundingBox  // normalized, BOTTOM-left origin
    let cx = b.midX
    let cy = 1.0 - b.midY     // flip to top-left origin
    let size = max(b.width, b.height)
    print(String(format: "%@\t%.4f\t%.4f\t%.4f\t%d", name, cx, cy, size, faces.count))
}
