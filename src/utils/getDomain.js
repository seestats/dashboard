export default function getDomain(url) {
  return url.replace('http://', '')
            .replace('https://', '')
            .split(':')[0]
            .replace('?', '')
}
