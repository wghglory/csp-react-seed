export function getQueryParam(name: string) {
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '=([^&#]*)');
  const results = regex.exec(window.location.href);
  if (!results || !results[1]) {
    return undefined;
  }
  return results[1].replace(/\+/g, ' ');
}

/*
 * Remove a querystring parameter from the browser address bar
 */
export function removeQueryParam(name: string) {
  const url = window.location.href
    .replace(new RegExp('[?&]' + name + '=[^&#]*(#.*)?$'), '$1')
    .replace(new RegExp('([?&])' + name + '=[^&]*&'), '$1');
  window.history.pushState('', '', url);
}
