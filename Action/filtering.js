export const getAllActive = (active) => {
  let ActiveTrue = [];
  active.map((a) => {
    return (ActiveTrue = [
      ...ActiveTrue,
      ...a.permissions.filter((e) => e.active),
    ]);
  });
  return ActiveTrue;
};

export const filterPermission = (ActiveTrue, selectedIds) => {
  let permissions = [];

  ActiveTrue.forEach((a) => {
    permissions.push(a.id);
  });

  selectedIds.forEach((a) => {
    if (a.checked === true) {
      if (!permissions.includes(a.id)) {
        permissions.push(a.id);
      }
    } else {
      ActiveTrue.forEach((e) => {
        if (e.id === a.id) {
          permissions = permissions.filter((permission) => permission !== e.id);
        }
      });
    }
  });

  return permissions;
};
