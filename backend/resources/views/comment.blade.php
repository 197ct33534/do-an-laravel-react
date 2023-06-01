<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Document</title>
</head>

<body>
    <form action="{{ route('postComment') }}" method="POST">
        {{ csrf_field() }}
        <textarea name="comment" placeholder="comment here..." id="" cols="30" rows="10"></textarea>
        <button type="submit">submit</button>
    </form>

</body>

</html>
