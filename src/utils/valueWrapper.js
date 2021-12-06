export default function valueWrapper(check, callback, res) {
  const valid = Object.values(check).filter((v) => !!v);
  if (valid.length === Object.values(check).length) {
    callback();
  } else {
    res.redirect(`/inventory/index`);
  }
}
