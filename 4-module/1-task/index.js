/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = createElement('ul');

  friends.forEach(friend => {
    ul.appendChild(createElement('li', `${friend.firstName} ${friend.lastName}`));
  });

  return ul;
}

function createElement(tagName, innerText) {
  let li = document.createElement(tagName);
  
  if (innerText) {
    li.innerText = innerText;
  }

  return li;
}