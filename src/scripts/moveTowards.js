export function moveTowards(person, destinationPosition, speed) {
  let distanceToTravelX = destinationPosition.x - person.position.x;
  let distanceToTravelY = destinationPosition.y - person.position.y;

  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

  if (distance <= speed) {
    person.position.x = destinationPosition.x;
    person.position.y = destinationPosition.y;
  } else {
    person.position.x += (distanceToTravelX / distance) * speed;
    person.position.y += (distanceToTravelY / distance) * speed;

    distanceToTravelX = destinationPosition.x - person.position.x;
    distanceToTravelY = destinationPosition.y - person.position.y;
    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }

  return distance;
}
